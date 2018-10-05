const Discord = require("discord.js");
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
module.exports.run = async (client, message, args, level) => {
   
    const msg = await message.channel.send("Loading...");
    let botuser = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
    let skele = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id).roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1) : message.member.roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1)
let rolesList = "";
for(let i = 0; i < skele.length; i++) {
    rolesList += "<@&" + skele[i] + ">";
    if(skele.length != (i+1))
      rolesList += ", ";
}
 
rolesList;
    const embed = new Discord.RichEmbed()
    .setAuthor(botuser.displayName, botuser.user.avatarURL)
    .setColor(botuser.displayColor)
    .setThumbnail(botuser.user.avatarURL)  
    .addField("User", `${message.mentions.users.first()}`, true)
    .addField("ID", botuser.id, true)
    .addField("Status", `${status[botuser.user.presence.status]}`, true)
    .addField("Playing", `${botuser.user.presence.game ? `${botuser.user.presence.game.name}` : "Not playing anything."}`, true)
    .addField("Joined Server At", `${botuser.joinedAt.toLocaleString('en-US')}`, true)
    .addField("Created Account At", `${botuser.user.createdAt.toLocaleString('en-US')}`, true)
    .addField("Roles", `${rolesList}`, true)
    .setFooter("©TheSkele27 2018.")
    msg.edit(embed)
  };

module.exports.help = {
    name: "whois",
    category: "Misc",
    description: "Provides user information.",
    usage: "whois"
  };
