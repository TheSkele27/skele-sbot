const Discord = require("discord.js");
const talkedRecently = new Set();
exports.run = async (client, message) => {
  if (talkedRecently.has(message.author.id) && !message.member.roles.has("490364533550874644")) {

    message.channel.send("You are being rate limited!" + message.author);
  } else { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .addField("• Ping Latency", `${msg.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("• API Latency", `${Math.round(client.ping)}ms`, true)
    .setFooter(`${client.user.username} | TheSkele27`);
  msg.edit(embed);

  }
}

/* const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
} */