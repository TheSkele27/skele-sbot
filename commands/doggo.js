const Discord = require("discord.js");
const superagent = require ("superagent");

module.exports.run = async (client, message, arges) => {
    
    let {body} = await superagent
    .get ('https://random.dog/woof.json');

    let dogembed = new Discord.RichEmbed()
    .setColor("#f48c42")
    .setTitle("Doggo")
    .setImage(body.url);

    message.channel.send(dogembed);
}