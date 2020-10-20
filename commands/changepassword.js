const db = require('quick.db')
const fetch = require('node-fetch')
const Discord = require('discord.js');


module.exports = {
    name: "changepw",
    description: "Change password of an user user from the Akiza.IO panel",

    async run (client, message, args) {
        
    let programkey = await db.get(`token1_${message.guild.id}`)
    if(programkey === null) return message.channel.send(new Discord.MessageEmbed().setDescription(`The \`Program Key\` **Has Not Been Set!**\n In Order To Use This Bot You Must Run The \`setprogramkey\` Command First.`).setColor("RED").setTimestamp());
    
    let apikey = await db.get(`token2_${message.guild.id}`)
    if(apikey === null) return message.channel.send(new Discord.MessageEmbed().setDescription(`The \`API Key\` **Has Not Been Set!**\n In Order To Use This Bot You Must Run The \`setapikey\` Command First.`).setColor("RED").setTimestamp());
    
    let user = args[0]
    let npassword = args[1]

    if(!user) return message.channel.send('Please Provide A Valid Username');
    if(!npassword) return message.channel.send('Please Provide A new Password');

    try {
    await fetch(`https://akiza.io/handler/api.php?program_key=${programkey}&api_key=${apikey}&action=changepass&user_to=${user}&new_pass=${npassword}`)
    .then(res => res.json())
    .then(message.channel.send(new Discord.MessageEmbed().setTitle('User Password Successfully Changed!').addField('Changed By:', message.author).addField('User:', `\`${args[0]}\``).addField('New Password:', `\`${args[1]}\``).setColor("YELLOW").setTimestamp()));
    }catch(error) {
        message.channel.send(`ERROR: ${error}`)
    }
    }
}