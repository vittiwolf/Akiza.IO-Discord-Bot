const db = require('quick.db')
const Discord = require('discord.js');

module.exports = {
    name: "setprogramkey",
    description: "Sets The Program Key",

    async run (client, message, args) {

    let ProgramKey = args[0]

    if(!args[0]) return message.channel.send('Please Provide A Valid Program Key');

    if(args[1]) return message.channel.send('The Program Key Can\'t Have Two Spaces');

    await db.fetch(`token1_${message.guild.id}`)
    await db.set(`token1_${message.guild.id}`, args[0])

    message.channel.send(`Succesffully Set Program Key To \`${ProgramKey}\``)
    }


}