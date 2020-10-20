const Discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('./../config.json')

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args) {

        let prefix = await db.get(`prefix_${message.guild.id}`);
        if(prefix === null) prefix = default_prefix;

        const embed = new Discord.MessageEmbed()
        .setTitle('Akiza.IO Discord Bot | Help')
        .setThumbnail(client.user.displayAvatarURL())
        .addField("Current Bot Prefix Is:", `\`${prefix}\``)
        .setColor("#00FFFF")
        .addField('`setup`', `How to setup the bot.`)
        .addField('`gen`', `Generate a key from the Akiza.IO panel. \nUsage: **${prefix}gen [days] [amount] [level]**`)
        .addField('`del`', `Delete a key from the Akiza.IO panel. \nUsage: **${prefix}del [Key]**`)
        .addField('`resethwid`', `Reset a user hwid from the Akiza.IO panel. \nUsage: **${prefix}resethwid [Username]**`)
        .addField('`ban`', `Ban a user from the Akiza.IO panel. \nUsage: **${prefix}ban [Username]**`)
        .addField('`unban`', `Unban a user from the Akiza.IO panel. \nUsage: **${prefix}unban [Username]**`)
        .addField('`changepassword`', `Change a user password from the Akiza.IO panel. \nUsage: **${prefix}changepw [Username] [New Password]**`)
        .addField('`setapikey`', `Sets The Akiza.IO API key. \nUsage: **${prefix}setapikey [API key]**`)
        .addField('`setprogramkey`', `Sets The Akiza.IO API key. \nUsage: **${prefix}setprogramkey [API key]**`)
        .addField('`setprefix`', `Change the bot prefix. \nUsage: **${prefix}setprefix [Prefix]**`)
        .addField('**Remind**', 'Make sure to set the API and Program Key before use the bot or it will not work!')
        .setFooter('Akiza.IO Discord Bot', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(embed)
        
    }
}

