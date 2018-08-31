/* const Discord = require("discord.js")
const keys = require("../data/apikeys.json")
const Client = require('fortnite');
const fortnite = new Client(keys.fortnite);
client != Client

module.exports.run = async (client, message, args) => {
    await message.delete();
    if(message.author.id !== "213632190557192192") return;
    let username = args[0];
    let platform = args[1] || 'pc';

    if(!username) return message.reply("Please provide a username.")

    let data = fortnite.user(username, platform).then(data => {
        console.log(data);
        let stats = data.stats;
        let lifetime = stats.lifetime;
        console.log(lifetime);

        let score = lifetime[6]['Score'];
        console.log(score);
    });



}

module.exports.help = {
    name: "stats"
  } */