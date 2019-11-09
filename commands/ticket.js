/*
const Config = require('../config.json')
const data = require('../tickets.json')
exports.use = async (client, message, nothing, args, command) => {
    const Discord = require('discord.js')
    const fs = require('fs')
if (!args[0]) {
    message.channel.send
    (new Discord.RichEmbed()
     .setColor(Config.recruitcolor).setDescription('Your Recruiting Channel has been created!\nOfficers will contact you in the shortly!').setTimestamp().setAuthor('Disaster Recruit System'))
    message.guild.createChannel(`support-${data.id}`).then(async c => {
    if (message.guild.channels.find(c => c.name.toLowerCase() === '-= seraphim support =-')) {
        if (message.guild.channels.find(c => c.name.toLowerCase() === 'seraphim support').type === 'category') {
            c.setParent(message.guild.channels.find(c => c.name.toLowerCase() === 'seraphim support').id)
        } else {
            c.setParent(message.guild.channels.find(c => c.name.toLowerCase() === 'seraphim support').id)
        }
        c.overwritePermissions(message.guild.defaultRole, {
            VIEW_CHANNEL: false
        })
        c.overwritePermissions(message.member, {
            VIEW_CHANNEL: true
        })
        c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'a+'), {
            VIEW_CHANNEL: true
        })
        c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'seraphim officer'), {
            VIEW_CHANNEL: true
        })
        c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'seraphim guild master'), {
            VIEW_CHANNEL: true
        })
        message.delete();

    }
    await c.send(new Discord.RichEmbed().setDescription(Config.reason.replace('<newline>', '\n')).setColor(Config.recruitcolor))
})
data.id++;
fs.writeFile('./tickets.json', '{\n"id":' + data.id + "\n}", (err) => {
    if (!err) return;
    console.error(err)
})

} else if (args[0] === 'close') {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed().setColor(Config.recruitcolor).setAuthor(message.author.tag, client.user.displayAvatarURL).setTimestamp().setDescription("You do not have permission to do this!"));
    if (message.channel.name.startsWith("support-")) {
        message.channel.delete();
    } else {
        message.channel.send(new Discord.RichEmbed().setColor(Config.embedColor).setAuthor(message.author.tag, client.user.displayAvatarURL).setTimestamp().setDescription(message.author + ', that command cannot used here.'))
        return
    }
    }
    if (args[0] === 'remove') {
        message.delete();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed().setColor(Config.recruitcolor).setAuthor(message.author.tag, client.user.displayAvatarURL).setTimestamp().setDescription("You do not have permission to do this!"));
        let c = message.channel;
        let id = args[1];
        let memberr = message.guild.members.get(id);
        c.overwritePermissions(memberr, {
            VIEW_CHANNEL: false
        })
        return;
    }
    if (args[0] === 'add') {
        message.delete();
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed().setColor(Config.recruitcolor).setAuthor(message.author.tag, client.user.displayAvatarURL).setTimestamp().setDescription("You do not have permission to do this!"));
        let c = message.channel;
        let id = args[1];
        let memberr = message.guild.members.get(id);
        c.overwritePermissions(memberr, {
            VIEW_CHANNEL: true
        })
        return;
    }
}
    
*/