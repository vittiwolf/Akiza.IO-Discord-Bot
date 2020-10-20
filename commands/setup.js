const Discord = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('./../config.json')

module.exports = {
    name: "setup",
    description: "How to setup the bot.",

    async run (client, message, args) {

        let prefix = await db.get(`prefix_${message.guild.id}`);
        if(prefix === null) prefix = default_prefix;

        const embed = new Discord.MessageEmbed()
        .setTitle('Akiza.IO Discord Bot | Setup')
        .setThumbnail(client.user.displayAvatarURL())
        .addField("Current Bot Prefix Is:", `\`${prefix}\``)
        .setColor("#00FFFF")
        .addField('`1 - Add Program Key`', `Place the order **setprogramkey** To add your Program Key.\nWithout having made this order, you will not be able to make the other orders.`)
        .addField('`2 - Where is my Program Key`', `Go to **https://akiza.io/panel/app.php**\nCopy Program Key.\nPlace the order **setprogramkey** To add your Program Key.`)
        .addField('`1 - Add API Key`', `Place the order **setapikey** To add your Program Key.\nWithout having made this order, you will not be able to make the other orders.`)
        .addField('`2 - Where is my API Key`', `Go to **https://akiza.io/profile/**\nCopy API Key.\nPlace the order **setapikey** To add your API Key.`)
        .addField('`3 - Where are my Program and API Keys stored`', `Your API and Program Keys are stored in a local database. (json.sqlite)`)
        .setFooter('Akiza.IO Discord Bot', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(embed)
        
    }
}

