const axios = require("axios")

module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Sorry, I can't do that.");
    function slowmode(s, m){
    axios({
        method: 'patch',
        url: `https://discordapp.com/api/v6/channels/${message.channel.id}`,
        headers: {
            "Authorization" : `Bot ${client.config.token}`
          },
        data: {
            rate_limit_per_user: s,
            reason: args.slice(1).join(" ")
        }
      }).then(message.channel.send(m))
      .catch((err) =>{
          message.channel.send(err);
      });
}


        
        if(args[0] === "off"){
            message.delete()
            slowmode(0, `***Slowmode has been disabled in this channel.***`);
        } else if(isNaN(args[0]) || parseInt(args[0]) > 120 || parseInt(args[0]) < 1){
            message.channel.send(`${client.config.emotes.error} **Error:** Please use a number between 1 and 120`);
        } else {
            message.delete()
            slowmode(args[0], `***Slowmode is enabled in this channel for ${args[0]} seconds.***`);
        }
}
