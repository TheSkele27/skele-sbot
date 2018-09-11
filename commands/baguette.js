const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
   
    message.delete().catch(O_o=>{}); 
    let baguetteembed = new Discord.RichEmbed()
    .setColor("#4286f4")
    .setImage("https://cdn.discordapp.com/attachments/468759629334183956/486332454119014401/55anelv9u5j11.png");
    
    message.channel.send(baguetteembed)

}
