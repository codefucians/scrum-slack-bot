var Botkit = require('./lib/Botkit.js');


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: true
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

// Post a message to a channel after being direct messaged
// -------------------------
controller.hears(['users'],['direct_message','direct_mention'],function(bot,message){

  bot.api.chat.postMessage({
    token: 'xoxb-137205649570-LiR73zdgqUjpV6P8acXUH7ow',
    channel: 'C3RRG3ZDY', 
    text: 'hello world (from postMessage)'
  });

});
// -------------------------