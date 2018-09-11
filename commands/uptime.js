const Discord = require('discord.js');

 module.exports.run = async (client, message, args) => {

  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.round(totalSeconds % 60);
   let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
   let uptimeEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setDescription(`My uptime is ${uptime}.`)
  .setColor("#4286f4");
  
  message.channel.send(uptimeEmbed);
}