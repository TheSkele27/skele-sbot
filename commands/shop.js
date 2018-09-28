const rp = require('request-promise');
const jimp = require("jimp");
const request = require('request');
const api = require('../data/apikeys.json');

exports.run = async (client, message, args) => {
async function createShop() {
  Promise.all([
      rp({
        uri:"https://fnbr.co/api/shop",
        headers: {
          "x-api-key":"api.fnbr"
        }
      }),
      jimp.read("../Images/shopBack.jpg"),
      jimp.read("../Images/Rarities/uncommon.png"),
      jimp.read("../Images/Rarities/rare.png"),
      jimp.read("../Images/Rarities/epic.png"),
      jimp.read("../Images/Rarities/legendary.png"),
      jimp.read("../Images/backdrop.png"),
      jimp.loadFont("../Fonts/open-sans-32-white.fnt"),
      jimp.loadFont("../Fonts/open-sans-28-white.fnt"),
      jimp.loadFont("../Fonts/open-sans-60-white.fnt"),
      jimp.loadFont("../Fonts/open-sans-92-white.fnt"),
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
        .write("../Shop.jpg");
      console.log(chalk.blue("Successfully created and saved shop image to ./Shop.jpg"));
    });
    }
    setInterval(createShop, 10000)
  }
}
