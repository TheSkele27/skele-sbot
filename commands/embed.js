const Discord = require('discord.js')

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(args.join(" "))
    .setTimestamp()
    
    message.delete()
    message.channel.send(embed)
}