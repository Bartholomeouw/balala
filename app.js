const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const client = new Discord.Client()
const prefix = config.prefix
const http = require('http');
const express = require('express');
const app = express();
const invites = {};
const wait = require('util').promisify(setTimeout);
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

});

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./commands/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});


//glitch stuff
app.get("/", (request, response) => {
 //   console.log(Date.now() + " Bot Online");
    
	response.sendStatus(200);
  });
  app.listen(process.env.PORT);
  setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);

//reset
/*client.on('message', msg => {
    let short = msg.content.toLowerCase();

    if (msg.content.startsWith(".reset")) {
  if (msg.author.id !== "201460488037466112" && msg.author.id !== "201460488037466112") return msg.channel.send(` **Sorry Only Bot Owner Can Use This Command** :sunglasses: `)
  var embed = new Discord.RichEmbed()
  .setTitle('Done.')
  .setDescription(`⚠ **Rebooting Streamer bot.., check log to know when ready.**`)
  .setColor('FFFF00');
       console.log(`${msg.author.tag} rebooted me`)
    msg.channel.send(embed).then(() => {
      client.destroy()
      process.exit(1);
    })
  }
});
*/
//clear
/*client.on('message', async message => {
   // const prefix = "!";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    if (command === 'clear') {
        if (message.member.roles.find(role => role.name === "Owner Spooke")) {
            if (args[0]) {
                message.delete();
                Purge(args[0]);
            } else {
                message.reply("Write how many message you want to delete")
            }
        }
    }
      function Purge(num) {
        message.channel.bulkDelete(num).catch(error => console.log('error deleted messages'));
    }
  });*/

//invite name
client.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
 // wait(1000);
client.on('ready', function() {
  console.log(`Bot has started, with ${client.users.size} users, ${client.guilds.size} guilds.`); 
      setInterval(async () => {
    const statuslist = [
     ` ${client.guilds.size} Server`,
     ` ${client.users.size} Users`,

    ]
    const random = Math.floor(Math.random() * statuslist.length);
    try {
      await client.user.setPresence({
        game: {
          name: `${statuslist[random]}`, 
          type: "WATCHING",
          url: 'https://www.twitch.tv'
        },
        status: "idle"
      });
    } catch (error) {
      console.error(error);
    }
  }, 40000);
});
  // Load all invites for all guilds and save them to the cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "modlog");
    logChannel.send(`> **${member}** joined using invite code **${invite.code}** from **${inviter.username}**. Invite was used **${invite.uses}** times since its creation.`);
  });
});


// Welcome Message
/*client.on('guildMemberAdd',  (member) => {
        member.guild.channels.get("640380830656626709").send(member + " Joined **Disaster Headquarter ♛** Discord");
  //  console.log('User ' + member.user.username + 'has joined the server!')
    var role = member.guild.roles.find(role => role.name === "Spooke's member");
    member.addRole(role);  
});*/

//var welcomeCH = client.channels.get('640380830656626709', '630376825968656394');
client.on("guildMemberAdd", (member) => {
   const welcomeCH = member.guild.channels.find(channel => channel.name === "welcome");
   // var welcomeCH = client.channels.get('640380830656626709');
    var embed = {
        color: 0xc40000,
        author: {
            name: `${member.displayName} Joined the ${member.guild.name} discord server!`,
            icon_url: 'https://imgur.com/8mn0UkD.png'
        }
    };
    welcomeCH.send({
        embed
    });
});

//Leaver Server
//var welcomeCH = client.channels.get('640380830656626709', '630376825968656394');
client.on("guildMemberRemove", (member) => {
    const welcomeCH = member.guild.channels.find(channel => channel.name === "welcome");
    var embed = {
        color: 0xc40000,
        author: {
            name: `${member.displayName} left the ${member.guild.name} discord server!`,
            icon_url: 'https://imgur.com/iNOSxa2.png'
        }
    };
    welcomeCH.send({
        embed
    });
});

// If Memeber GoT Banned
/*var welcomeCH = client.channels.get('604855006432198656');
client.on("guildBanAdd", (guild, user) => {
    var welcomeCH = client.channels.get('604855006432198656');
    var embed = {
        color: 0xc40000,
        author: {
            name: `${user.username} Banned From Server`,
            icon_url: 'https://i.imgur.com/x80iq22.png'
        }
    };
    welcomeCH.send({
        embed
    });
});
*/

//Responses for Hello 
const helloResponses = ["Hello", "Hi", "Hi there"];
// The onMessage event handler
client.on('message', function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith("")) return;
    var args = message.content.substring("".length).split(" ");
    switch (args[0].toLowerCase()) {
        case "hello":
            var response = helloResponses [Math.floor(Math.random()*helloResponses .length)];
            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
});

// send message to role on join
/*client.on("guildMemberUpdate", (oldMember, newMember) => {
	if (newMember.user.bot) return;
	for (var i = 0; i < config.RolesOnJoin.length; i++) {
		var Role = newMember.guild.roles.find(role => role.name === config.RolesOnJoin[i]);
		var msgToSend = config.RolesMsgs[i];
		if (!Role || !msgToSend) return;
		if (!oldMember.roles.find(role => role.name === Role.name) && newMember.roles.find(role => role.name === Role.name)) {

			newMember.send("<@" + newMember.user.id + ">" + msgToSend);
		}
	}
});*/

client.on('message', message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(config.prefix.length)
    if (!message.content.startsWith(config.prefix)) return;

    try {
        let cmd = require(`./commands/${command}.js`)
        cmd.use(client, message, message.member, args, command)
    } catch (err) {
    }
})

client.login(process.env.token);

client.on('ready', () => {
//    console.log('BOT STARTED')
        console.log('Bot Started');
	console.log(`The Prefix: ${config.prefix}`);
 var allGuilds = client.guilds.map(x => `Server: ${x.name} - Owner: ${x.owner.user.username}`).join('\n');
  console.log(allGuilds);
})

/*client.on('ready', () => {
    client.user.setActivity("Seraphim | .join")
})*/