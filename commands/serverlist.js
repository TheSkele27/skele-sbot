const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const guildmap = client.guilds.map(i => `(Name: ${i.name}) | (ID: \`${i.id}\`) | (Members: ${i.members.size})`);

  const embed = new Discord.RichEmbed()
    .setAuthor('Guilds List')
    .setDescription(guildmap)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();

  const sendSL = await message.channel.send(embed);
  if (args[0] === 'hide') {
    sendSL.delete(10000);
    message.delete(9000);
  }
};