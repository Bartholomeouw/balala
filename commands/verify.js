const Config = require('../config.json')
const Discord = require('discord.js')


exports.use = async (client, message, nothing, args, command) => {


    if (args[0]) {
  if(!message.member.roles.find(r => r.name == "Owner Spooke") && !message.member.roles.find(r => r.name == "Officers")) return message.reply("You do not have perms to use this command.")
      let User = message.guild.member(message.mentions.users.first());  //|| message.guilds.members.get(args[0])
      if(!User) return message.channel.send('Please specify a user to verify.');  

      let FoundRole = message.guild.roles.find(r => r.name == "Spooke's member")
  
      if(User.roles.find(r => r.name == "Spooke's member")) return message.channel.send(`${User} 💪🏽 Is already a Guild Member.`)
      User.addRole(FoundRole) 
      message.channel.send(`✅ ${User} Become a Guild Member.`);

    }
};
