exports.run = async (client, message, args) => {
    /* if(!message.member.roles.some(r=>["Admin", "Mod", "BotAdmin", "Manager", "Council"].includes(r.name)) ) */
    if(!message.member.hasPermission("MANAGE_MESSAGES")) 
    return message.reply("Sorry, you don't have permissions to use this!");
    
    message.delete()
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 10000)
      return message.reply("Please provide a number between 1 and 10000 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}
