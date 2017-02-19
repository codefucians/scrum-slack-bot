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


// bot.say(
//   {
//     text: 'my message_text',
//     channel: '+1(###)###-####' // a valid facebook user id or phone number
//   }
// );


// Start a direct message to a user
/* ---------------------------- */
controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message,function(err,convo) {
    console.log(message);
    convo.say('Heard ya');
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say('Private reply!');
  });
});
/* ----------------- */

// controller.hears(['users'],['direct_message','direct_mention'],function(bot,message){
  // bot.say(bot.api.users);
  // bot.reply('hello');
  
  // bot.startPrivateConversation(message,function(err,dm) {
  //   console.log("");
  //   console.log("---");
  //   console.log("---");

  //   // dm.say('Private reply!');

    
  //   // console.log("hello world");
  //   bot.api.users.list({}, function (err, response) {
  //     if (response.hasOwnProperty('members') && response.ok) {
  //       // console.log("HELLO WORLD");
        
  //       var members = response.members;
  //       for (var i = 0; i < members.length; i++){
          
  //         var member = members[i];

  //         var u = {};
  //         u.id = member.id;
  //         u.name = member.name;

  //         bot.api.users.getPresence({
  //           token: 'xoxb-137205649570-LiR73zdgqUjpV6P8acXUH7ow',
  //           user: u.id
  //         }, function(err, res){
  //           // START INNER-MOST NEST

  //           u.presence = res.presence;
            
  //           var str = u.name + " (" + u.id + ") | presence=" + u.presence;

  //           console.log(str);
  //           dm.say(str);

  //           // END INNER-MOST NEST
  //         });
  //       }
  //     }
  //   });

  //   console.log("---");
  //   console.log("---");
  //   console.log("");
  // });
  

  // bot.api.users.list({}, function (err, response) {
  //   if (response.hasOwnProperty('members') && response.ok) {
  //       // var fullTeamList = [];
  //       var total = response.members.length;

  //       for (var i = 0; i < total; i++) {
  //           var member = response.members[i];
  //           // /fullTeamList.push({name: member.name, id: member.id});
  //           // bot.say('name='+member.name + ' | id='+member.id);
  //           bot.reply('hello');
  //       }

  //       // bot.say(fullTeamList);
  //   }
  // });
controller.hears(['hello'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.startConversation(message, function(err, convo) {
    if (!err) {

      var questions = [
        "What did you accomplish yesterday?",
        "What will you do today?",
        "What obstacles are impeding your progress?"
      ];

      // Question 1
      // --------------------- //
      convo.ask(questions[0], function(q0Response, convo) {
        convo.ask(questions[1], function(q1Response, convo) {
          convo.ask(questions[2], function(q2Response, convo) {

            // console.log('');
            // console.log('');
            // console.log('last question callback');
            // console.log('');
            // console.log('');
            // // convo.status = 'completed';

            // var ans1 = convo.extractResponse('q1');
            // var ans2 = convo.extractResponse('q2');
            // var ans3 = convo.extractResponse('q3');
            
            // convo.say(questions[0]);
            // convo.say('>' + q0Response.text);

            // convo.say(questions[1]);
            // convo.say('>' + q1Response.text);

            // convo.say(questions[2]);
            // convo.say('>' + q2Response.text);

            convo.stop();
          }, {'key': 'q3'});

          convo.next();
        }, {'key': 'q2'});

        convo.next();
      }, {'key': 'q1'});
      // --------------------- //


      convo.on('end', function(convo) {
        console.log('');
        console.log('');
        console.log("Conversation 'end' event fired!");

        // if (convo.status == 'completed') {
          // bot.reply(message, 'OK! I will post your updates.');

          var ans1 = convo.extractResponse('q1');
          var ans2 = convo.extractResponse('q2');
          var ans3 = convo.extractResponse('q3');

          console.log('ans1='+ans1);
          console.log('ans2='+ans2);
          console.log('ans3='+ans3);


          // bot.reply(message, questions[0]);
          // bot.reply(message, '>' + ans1);
          // bot.reply(message, questions[1]);
          // bot.reply(message, '>' + ans2);
          // bot.reply(message, questions[2]);
          // bot.reply(message, '>' + ans3);
          var finalStr = questions[0] + '>' + ans1 + questions[1] + '>' + ans2 + questions[2] + '>' + ans3;
          bot.reply(message, finalStr);


          // controller.storage.users.get(message.user, function(err, user) {
            
          //   var ans1 = convo.extractResponse('q1');

          //   controller.storage.users.save(user, function(err, id) {
          //     bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
          //   });
          // });
        // } else {
        //   // this happens if the conversation ended prematurely for some reason
        //   bot.reply(message, 'OK, nevermind!');
        // }

        console.log('');
        console.log('');
      });
    }
  });
});



  // chat.postMessage({
  //   token: 'xoxb-137205649570-LiR73zdgqUjpV6P8acXUH7ow',
  //   channel: 'C3RRG3ZDY', 
  //   text: 'hello world (from postMessage)'
  // });
  // // 'C3YMQE8CE',

