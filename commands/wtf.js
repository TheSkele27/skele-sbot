const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
   
    message.delete().catch(O_o=>{}); 
    let wtfembed = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setImage("https://media.discordapp.net/attachments/450923509565095936/485003197103079425/unknown.png");
    
    message.channel.send(wtfembed)

}