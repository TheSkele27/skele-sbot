const Discord = require("discord.js");
const superagent = require ("superagent");

module.exports.run = async (client, message, arges) => {
    
    let {body} = await superagent
    .get('http://aws.random.cat/meow');

    let catembed = new Discord.RichEmbed()
    .setColor("#f48c42")
    .setTitle(":cat: Meow")
    .setImage(body.file);

    message.channel.send(catembed);
}