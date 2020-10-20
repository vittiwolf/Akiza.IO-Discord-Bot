const Discord = require('discord.js');

const client = new Discord.Client();

const { token, default_prefix } = require('./config.json');

const config = require('./config.json');
client.config = config;

const db = require('quick.db')

const { readdirSync } = require('fs');

const { join } = require('path');

client.commands= new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    console.clear();
    console.log("Bot Online");
    console.log("Bot Default Prefix is:", config.default_prefix)
    console.log("Logged in as:", client.user.tag)
});

client.on("message", async message => {
let prefix = await db.get(`prefix_${message.guild.id}`);
if(prefix === null) prefix = default_prefix;


    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You Need The \`ADMINISTRATOR\` Permission For Use This Command');
        try {
            message.delete();
            client.commands.get(command).run(client, message, args);
        } catch (error){
            console.error(error);
        }
    }

})


client.login(token);

    