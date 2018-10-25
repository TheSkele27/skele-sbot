const Discord = require("discord.js")

module.exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Loading...");
    let botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
    msg.edit("**ID:**\n"botuser.id)
}
