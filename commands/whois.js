const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
   
    const msg = await message.channel.send("Loading...");
    let botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
    let skele = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id).roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1) : message.member.roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1)
let test = "";
for(let i = 0; i < skele.length; i++) {
    test += "<@&" + skele[i] + ">";
    if(skele.length != (i+1))
      test += ", ";
}

test;
    const embed = new Discord.RichEmbed()
    .setAuthor(botuser.displayName, botuser.user.avatarURL)
    .setColor(botuser.displayColor)
    .setThumbnail(botuser.user.avatarURL)
    .addField("User", `${message.mentions.users.first()}`, true)
    .addField("ID", botuser.id, true)
    .addField("Status",`${botuser.user.presence.status}`, true)
    .addField("Game", `${botuser.user.presence.game.name}`, true)
    .addField("Joined Server At", `${botuser.joinedAt}`, true)
    .addField("Created Account At", `${botuser.createdAt}`, true)
    .addField("Roles", `${skele}`, true)
    .setFooter("©TheSkele27 2018.")
    msg.edit(embed)
  };
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["userinfo"],
    permLevel: "Standard User"
  };