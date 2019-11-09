const Config = require('../config.json')
const data = require('../tickets.json')
exports.use = async (client, message, nothing, args, command) => {
    const Discord = require('discord.js')
    const fs = require('fs')

    if (args[0]) {
        message.channel.send("<@" + message.author.id + ">" + " **A recruiting channel has been created for you to communicate with** <@&512026103485825035>!\n**we will contact you shortly!**")
      /*
        (new Discord.RichEmbed()
                             .setAuthor('Seraphim Recruit System')
                             .setColor(Config.recruitcolor)
                       //      .addField('Requested By',message.author.tag)
                             .setDescription(message.author + '\nA recruiting channel has been created for you to communicate with officers!\n**We will contact you shortly!**')
                          //   .setFooter(`Requested by ${message.author.tag}`)
                             .setTimestamp())
*/
        message.guild.createChannel(`recruit-${data.id}`).then(async c => {
            let reason = args.join(" ");
            if (message.guild.channels.find(c => c.name.toLowerCase() === 'seraphim recruits')) {
                if (message.guild.channels.find(c => c.name.toLowerCase() === 'seraphim recruits').type === 'category') {
                    c.setParent(message.guild.channels.find(c => c.name.toLowerCase() === 'seraphim recruits').id)
                } else {
                    c.setParent(message.guild.channels.find(c => c.name.toLowerCase() === 'seraphim recruits').id)
                }
                c.overwritePermissions(message.guild.defaultRole, {
                    VIEW_CHANNEL: false
                })
                c.overwritePermissions(message.member, {
                    VIEW_CHANNEL: true
                })
                c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'manager'), {
                    VIEW_CHANNEL: true
                })
                c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'officers'), {
                    VIEW_CHANNEL: true
                })
                c.overwritePermissions(message.guild.roles.find(r => r.name.toLowerCase() === 'guild master'), {
                    VIEW_CHANNEL: true
                })
                message.delete();

            }
            await c.send("<@" + message.author.id + ">" ,new Discord.RichEmbed().addField('✦ Subject', `${reason}`).addField('✦ Guild Member Application', "**Please, Answer The Following Questions**\n   ▣  What's your in-game Family Name?\n   ▣  What are your native and second languages? \n   ▣ Old guild names, reason for leaving them \n ▣   Would you like to receive **Guild Missions** `Notifications` on Discord? (You might feel annoyed if you have no intention to participate in guild missions but you will not be able to increase your wage) In case you no longer need to receive notifications, kindly DM <@148514044578496512> on discord" ).setDescription(` Thank you for your request.\n**The guild officers will assist you soon!**`).setColor(Config.recruitcolor))
        })
        data.id++;
        fs.writeFile('./tickets.json', '{\n"id":' + data.id + "\n}", (err) => {
            if (!err) return;
            console.error(err)
        })

    }
}