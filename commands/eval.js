const Discord = require('discord.js');

module.exports.run = async (client, message, args) => { 
  if(message.author.id !== client.config.ownerID) return;
  const code = args.join(' ');
  try {
    const evaled = eval(code);
    //if (typeof evaled !== 'string')
    //evaled = require('util').inspect(evaled, {depth:1});
    const clean = await client.clean(client, evaled);
    const embed1 = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#00FF00')
      .setTitle('__JAVASCRIPT EVALUATION__')
      .setDescription(`\`\`\`js\n${clean}\n\`\`\``)
      .setTimestamp()
      .setFooter(`${client.user.username} | Requested by ${message.author.username}#${message.author.discriminator}`);
    message.channel.send(embed1);
  } catch (err) {
    console.log(err);
    const embed2 = new Discord.RichEmbed();
    embed2.setAuthor(client.user.username, client.user.avatarURL);
    embed2.setColor('#FF0000');
    embed2.setTitle('__JAVASCRIPT EVALUATION__');
    embed2.setDescription(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    embed2.setTimestamp();
    embed2.setFooter(`${client.user.username} | Requested by ${message.author.username}#${message.author.discriminator}`);
    message.channel.send(embed2);
  }
};

/* module.exports.run = async (client, message, args) => {
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
      
        if (message.content.startsWith(client.config.prefix + "eval")) {
          if(message.author.id !== client.config.ownerID) return;
          try {
            const code = args.join(" ");
            let evaled = eval(code);
      
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
              
            message.channel.send(clean(evaled), {code:"xl"});
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
        }
      };
 */