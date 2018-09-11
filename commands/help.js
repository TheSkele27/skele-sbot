const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setTitle("Commands")
    .setAuthor("Help", "https://cdn.discordapp.com/avatars/213632190557192192/a1b0fc6b9ab0026138c601b5a0e39175.png?size=256")
    .setColor(29848)
    .setDescription("Commands usage: ??<command> <user>\n\nModeration:\n??kick ~ Kicks the user\n??ban ~ Ban's the user\n??purge ~ Delete's msgs in bulk\n??mute ~ Mutes the user for a certain time specified\n??addrole ~ Add's a role to user\n??report ~ Report the user to the mod team, #reports channel must be present\n\n\n\n**Fun Commands**:\n??say ~ Makes the bot say what you type out\n??cat ~ Random picture of a cat\n??doggo ~ Random picture of a doggo\n??slap ~ Slaps the user you tag\n??noods ~ Top quality noods\n\n\n\n**Other Commands:**\n??serverinfo ~ About the server\n??botinfo ~ About the bot\n??help ~ Help command")
    .setFooter("©TheSkele27 2018", "https://cdn.discordapp.com/avatars/213632190557192192/a_a1b0fc6b9ab0026138c601b5a0e39175.gif?size=256&f=.gif")
    .setTimestamp()
  
    message.channel.send({embed});

}