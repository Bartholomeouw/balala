module.exports.run = async (client, message, args) => {
    if(message.guild.member(message.author.id).roles.some(r=>['Owner Spooke', 'Bot List Moderator', 'Bot List Owner'].includes(r.name))) {
        let ID = args[0]
        
        let channe = client.channels.get('642713722799783946')
        if(channe) channe.send(`Bot <@${ID}> has been approved by ${message.author.tag}`)
        message.channel.send('Approved.')
    } else {
        message.channel.send('You are not an admin/moderator.')
    }
   
}

module.exports.help = {
    name: 'approve'
}