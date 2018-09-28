const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    
    message.channel.send('Current Fortnite Shop Rotation', {
        files: [
            "../Shop.jpg"
        ]
    });
}