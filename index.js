const Discord = require("discord.js");
const client = new Discord.Client({
  fetchAllMembers: true})
//const client = new Discord.Client();
const fs = require("fs");
const api = require("./data/apikeys.json")
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
if (message.content === '!shop') {
async function createShop() {
  Promise.all([
      rp({
        uri:"https://fnbr.co/api/shop",
        headers: {
          "x-api-key":api.fnbr
        }
      }),
      jimp.read("./Images/shopBack.jpg"),
      jimp.read("./Images/Rarities/uncommon.png"),
      jimp.read("./Images/Rarities/rare.png"),
      jimp.read("./Images/Rarities/epic.png"),
      jimp.read("./Images/Rarities/legendary.png"),
      jimp.read("./Images/backdrop.png"),
      jimp.loadFont("./Fonts/open-sans-32-white.fnt"),
      jimp.loadFont("./Fonts/open-sans-28-white.fnt"),
      jimp.loadFont("./Fonts/open-sans-60-white.fnt"),
      jimp.loadFont("./Fonts/open-sans-92-white.fnt"),
    ])
    .then(values => {
      let [, shopImage, uncommonImage, rareImage, epicImage, legendaryImage, backDrop, font32, font28, titleFont, mainTitle] = values;
      let imageMap = {uncommon: uncommonImage, rare: rareImage, epic: epicImage, legendary: legendaryImage};
      let shop = JSON.parse(values[0]);
      let daily = shop.data.daily;
      let featured = shop.data.featured;
      let dailyImgs = Promise.all(daily.map(obj => jimp.read(obj.images.icon)));
      let featImgs = Promise.all(featured.map(obj => jimp.read(obj.images.icon)));
      return Promise.all([
          dailyImgs,
          featImgs,
          values,
          daily,
          featured,
          imageMap
        ]);
    })
    .then(shopImages => {
      let [dailyImgs, featImgs, [, shopImage,,,,, backDrop, font32, font28, titleFont, mainTitle], daily, featured, imageMap] = shopImages;
      
      let i = 0;
      let iconSize = 225;
      let rarityDiff = 25;
      let xPad = 100;
      let yPad = 250;
      let columns = 3;
      let infoBoxHeight = 80;
      let width = shopImage.bitmap.width, height = shopImage.bitmap.height;
      
      let Title = "Fortnite Battle Royale Item Shop";
      let titleWidth = jimp.measureText(mainTitle, Title);
      let dailyWidth = jimp.measureText(titleFont, "Daily Items");
      let featuredWidth = jimp.measureText(titleFont, "Featured Items");
      shopImage.print(mainTitle, Math.floor(width / 2 - titleWidth / 2), 50, Title)
        .print(titleFont, Math.floor((iconSize*columns + rarityDiff*3 + xPad) / 2 - dailyWidth / 2), yPad-90, "Daily Items")
        .print(titleFont, Math.floor(width-(iconSize*columns + rarityDiff*3 + xPad)  / 2 - featuredWidth / 2), yPad-85, "Featured Items");
      
      
      dailyImgs.map(x => {
        let itemNameWidth = jimp.measureText(font32, daily[i].name);
        let itemPriceWidth = jimp.measureText(font28, daily[i].price + " V-Bucks");
        x.resize(iconSize, iconSize);
        let infoBox = backDrop.clone()
          .resize(iconSize, infoBoxHeight)
          .print(font32, Math.floor(iconSize / 2 - itemNameWidth / 2), 5, daily[i].name)
          .print(font28, Math.floor(iconSize / 2 - itemPriceWidth / 2), 40, daily[i].price + " V-Bucks");
        let rarityImage = imageMap[daily[i].rarity]
          .clone()
          .resize(iconSize, iconSize)
          .composite(x, 0, 0)
          .composite(infoBox, 0, iconSize-infoBoxHeight);
        shopImage.composite(rarityImage, (i%columns)*(iconSize+rarityDiff)+xPad, Math.floor(i/columns)*(iconSize+rarityDiff)+yPad);
        i++;
      });
      
      i = 0;
      featImgs.map(x => {
        let itemNameWidth = jimp.measureText(font32, featured[i].name);
        let itemPriceWidth = jimp.measureText(font28, featured[i].price + " V-Bucks");
        x.resize(iconSize, iconSize);
        let infoBox = backDrop.clone()
          .resize(iconSize, infoBoxHeight)
          .print(font32, Math.floor(iconSize / 2 - itemNameWidth / 2), 5, featured[i].name)
          .print(font28, Math.floor(iconSize / 2 - itemPriceWidth / 2), 40, featured[i].price + " V-Bucks");
        let rarityImage = imageMap[featured[i].rarity]
          .clone()
          .resize(iconSize, iconSize)
          .composite(x, 0, 0)
          .composite(infoBox, 0, iconSize-infoBoxHeight);
        shopImage.composite(rarityImage, width-((i%columns)*(iconSize+rarityDiff)+xPad*2+(iconSize+rarityDiff)/2), Math.floor(i/columns)*(iconSize+rarityDiff)+yPad);
        i++;
      });
      shopImage.quality(100)
        .write("./Shop.jpg");
      console.log(chalk.blue("Successfully created and saved shop image to ./Shop.jpg"));
    });
}
setInterval(createShop, 10000)
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

//NDgxNDQwMjA3OTYzNDIyNzIw.Dl2Yhg._cb1jHlpUY2h62ZFppIru-NBmOs'

client.login(config.token);
