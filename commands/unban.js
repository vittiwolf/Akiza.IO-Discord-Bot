const db = require('quick.db')
const fetch = require('node-fetch')
const Discord = require('discord.js');


module.exports = {
    name: "unban",
    description: "Unban a user from the Akiza.IO panel",

    async run (client, message, args) {
        
    let programkey = await db.get(`token1_${message.guild.id}`)
    if(programkey === null) return message.channel.send(new Discord.MessageEmbed().setDescription(`The \`Program Key\` **Has Not Been Set!**\n In Order To Use This Bot You Must Run The \`setprogramkey\` Command First.`).setColor("RED").setTimestamp());
    
    let apikey = await db.get(`token2_${message.guild.id}`)
    if(apikey === null) return message.channel.send(new Discord.MessageEmbed().setDescription(`The \`API Key\` **Has Not Been Set!**\n In Order To Use This Bot You Must Run The \`setapikey\` Command First.`).setColor("RED").setTimestamp());
    
    let user = args[0]

    if(!user) return message.channel.send('Please Provide A Valid Username');

    try {
    await fetch(`https://akiza.io/handler/api.php?program_key=${programkey}&api_key=${apikey}&action=unban&user_to=${user}`)
    .then(res => res.json())
    .then(message.channel.send(new Discord.MessageEmbed().setTitle('User Successfully Unbanned!').addField('Unbanned By:', message.author).addField('User Unbanned:', `\`${args[0]}\``).setColor("GREEN").setTimestamp()));
    }catch(error) {
        message.channel.send(`ERROR: ${error}`)
    }
    }
}