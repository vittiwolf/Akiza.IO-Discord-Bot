const db = require('quick.db')
const fetch = require('node-fetch')
const Discord = require('discord.js');

module.exports = {
    name: "del",
    description: "Delete a key from the Akiza.IO panel",

    async run (client, message, args) {

    let key = args[0]

    let programkey = await db.get(`token1_${message.guild.id}`)
    if(programkey === null) return message.channel.send(new Discord.MessageEmbed().setDescription(`The \`Program Key\` **Has Not Been Set!**\n In Order To Use This Bot You Must Run The \`setprogramkey\` Command First.`).setColor("RED").setTimestamp());

    let apikey = await db.get(`token2_${message.guild.id}`)
    if(apikey === null) return message.channel.send(new Discord.MessageEmbed().setDescription(`The \`API Key\` **Has Not Been Set!**\n In Order To Use This Bot You Must Run The \`setapikey\` Command First.`).setColor("RED").setTimestamp());


    if(!args[0]) return message.channel.send('Please Provide A Valid Key');

    try {
    await fetch(`https://akiza.io/handler/api.php?program_key=${programkey}&api_key=${apikey}&action=deletelicense&license=${key}`)
    .then(res => res.json())
    .then(json => message.channel.send(new Discord.MessageEmbed().setTitle('Key Successfully Deleted!').addField('Deleted By:', message.author).addField('Key Deleted:', `\`${args[0]}\``).setColor("PURPLE").setTimestamp()));
    }catch(error) {
        message.channel.send(`ERROR: ${error}`)
    }
    }
}