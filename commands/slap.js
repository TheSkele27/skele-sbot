const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.channel.send(`${message.author} has slapped ${message.mentions.users.first()} with a floppy disk.`)
}