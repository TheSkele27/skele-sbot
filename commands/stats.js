const { version } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setTitle(`STATISTICS`)
    .setColor(message.member.displayColor)
    .addField("• Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("• Uptime", `${duration}`, true)
    .addField("• Users  ", `${client.users.size.toLocaleString()}`, true)
    .addField("• Servers ", `${client.guilds.size.toLocaleString()}`, true)
    .addField("• Channels", `${client.channels.size.toLocaleString()}`, true)
    .addField("• Discord.js Version", `v${version}`, true)
    .addField("• Node Version", `${process.version}`, true)
    .addField("• Creator", `TheSkele27#1337`, true)
    .setFooter(`${client.user.username} | TheSkele27`);
  message.channel.send(embed);
};