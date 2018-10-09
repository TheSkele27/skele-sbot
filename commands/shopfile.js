const schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();

rule.hour = 20;
rule.minute = 3;

module.exports.run = async (client, message, args) => {
    const channelpng = client.channels.get('377856206414544896');
    	console.log("Start File")
    	console.log('start sending file function')
        var j = schedule.scheduleJob(rule, function(){
          channelpng.send({
            files: [{
              attachment: './Shop.jpg',
               name: 'Shop.jpg'
     }]
    })
  });
}
