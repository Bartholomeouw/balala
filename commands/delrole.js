const Config = require('../config.json')
const Discord = require('discord.js')


exports.use = async (client, message, nothing, args, command) => {


    if (args[0]) {
  if(!message.member.roles.find(r => r.name == "Owner Spooke") && !message.member.roles.find(r => r.name == "Officers")) return message.reply("You do not have perms to use this command.")
      let User = message.guild.member(message.mentions.users.first());  //|| message.guilds.members.get(args[0])
      if(!User) return message.channel.send('Please specify a user to verify.');  

      let FoundRole = message.guild.roles.find(r => r.name == "Spooke's member")
    if(!FoundRole) return message.channel.send("**Role not found.** `*delrole <user>`");

      if(!User.roles.has(FoundRole.id)) return message.reply(`😏 This user doesn't have the Guild role.`)
      User.removeRole(FoundRole) 
      message.channel.send(`👋🏼 ${User} You are no longer a Guild Member.`);
    }
};
