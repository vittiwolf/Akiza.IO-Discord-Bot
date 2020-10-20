const db = require('quick.db')
const Discord = require('discord.js');

module.exports = {
    name: "setapikey",
    description: "Sets The API Key",

    async run (client, message, args) {

    let apikey = args[0]

    if(!args[0]) return message.channel.send('Please Provide A Valid API Key');

    if(args[1]) return message.channel.send('The API Key Can\'t Have Two Spaces');

    await db.fetch(`token2_${message.guild.id}`)
    await db.set(`token2_${message.guild.id}`, args[0])

    message.channel.send(`Succesffully Set API Key To \`${apikey}\``)
    }


}