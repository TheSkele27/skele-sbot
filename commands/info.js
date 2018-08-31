const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setTitle("TheSkele27", "https://cdn.discordapp.com/avatars/213632190557192192/a_a1b0fc6b9ab0026138c601b5a0e39175.gif?size=256&f=.gif")
    .setAuthor("TheSkele27", "https://cdn.discordapp.com/avatars/213632190557192192/a_a1b0fc6b9ab0026138c601b5a0e39175.gif?size=256&f=.gif")
    .setColor(29848)
    .setDescription("This bot has been made by TheSkele27#1337 using Node.JS")
    .setFooter("TheSkele27#1337 2018", "https://cdn.discordapp.com/avatars/213632190557192192/a_a1b0fc6b9ab0026138c601b5a0e39175.gif?size=256&f=.gif")
    .setTimestamp()
    .addField("Node.JS",
      "https://nodejs.org/en/download/")
  
    message.channel.send({embed});
  
}