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

client.on('ready', () => {
    client.user.setActivity("Seraphim | .join")
})
