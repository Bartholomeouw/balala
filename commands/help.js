const Config = require('../config.json')

exports.use = async (client, message, nothing, args, command) => {
    const Discord = require('discord.js')
    if (!args[0] || args[0] === '1') {
        let banEmbed = new Discord.RichEmbed()
            .setColor(Config.recruitcolor)
            .addField("Seraphim Helper Commands", ".join (subject) <#610338374229688332>\n**.Join (type your reason for joining Seraphim.)** \n`Example: .join I'm a new player in BDO`")
        message.channel.send(banEmbed);
        return;
    };
}

