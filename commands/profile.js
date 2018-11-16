const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //const msg = await message.channel.send("Loading...");
    let botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
    const thisUser = botuser.id;
    const Messages = await client.stats.get(`${thisUser} | ${message.guild.id}`);

    const embed = new Discord.RichEmbed()
    .setAuthor(botuser.displayName, botuser.user.avatarURL)
    .setColor(botuser.displayColor)
    .setThumbnail(botuser.user.avatarURL)
    .addField("Messages", Messages, true)
    message.channel.send(embed);


}