module.exports.run = (client, message) => { 
    const guildmap = client.guilds.map(i => `(Name: ${i.name}) | (ID: ${i.id}) | (Members: ${i.members.size})`); 
 message.channel.send(guildmap); 
  }; 
    
