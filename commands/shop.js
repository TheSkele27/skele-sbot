module.exports.run = async (client, message, args) => {
    
    message.channel.send('**Current Fortnite Battle Royale Shop Rotation** *API Provided by fnbr.co*', {
        files: [
            "../Shop.jpg"
        ]
    });
}