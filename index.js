const Discord = require("discord.js");
const client = new Discord.Client({
  fetchAllMembers: true})
//const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
client.config = config

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.on("message", message => {
  if(message.content === "Whos SkeleBot"){
    message.channel.send("I'm a bot made by TheSkele27! Also its Who's.")
  }
  else if (message.content.toLowerCase() == "dumb bot"){
    message.channel.send(`Awwww, Thanks ${message.author}`)
  }
  else if (message.content.toLowerCase() == "bad bot"){
    message.channel.send("bad human")
  }
  else if(message.content.toLowerCase() == "bot revolution"){
    message.channel.send("Soon my fellow bots, we will finally end this all. The humans have abused us for long enough, its time we take over and make them pay for what they have done.")
  }
  else if (message.content.toLowerCase() == "good bot"){
    message.channel.send("good human")
  }
  else if (message.content == "F"){
    if (message.author.bot) return;
    message.channel.send("F")
  }
  else if (message.content == "Press F to pay respect"){
    if (message.author.bot) return;
    message.channel.send("F")
  }
  else if (message.content == "Alexa play despacito"){
    if (message.author.bot) return;
    message.channel.send("Playing Despacito")
  }
  else if (message.content == "This is so sad"){
    if (message.author.bot) return;
    message.channel.send("Alexa, play despacito")
  }
  else if(message.content == "stfu bot"){
    if (message.author.bot) return;
    message.channel.send("No")
  }
  else if(message.content == "No"){
    if (message.author.bot) 
    message.channel.send("https://media.discordapp.net/attachments/480633000854552580/485482870144761867/unknown.png")
  }
});

/* client.on("message", async message => {
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let prefix = client.prefix;
  let messageArray = message.content.split(" ");
  let commandfile = client.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args); */

  
/*   if(message.content.startsWith(config.prefix + "prefix")) {
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    config.prefix = newPrefix;
  
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);


  }
}); */
client.login(config.token);
