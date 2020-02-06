var accountSid = 'AC4acbd9af21b906ec230aecd388e6d127';
var authToken = 'ae90bec4b7358d3ea652887f79fb89ea';

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var TwilioEvents = {

   	sendOtp: function(phNum,otp){
      	console.log('new message',phNum)
      	client.messages.create({
		    body: 'Otp from heros-meet app'+ ' ' +otp,
		    to: phNum,  // Text this number
		    from: '+12034576210' // From a valid Twilio number
		})
		.then((message) => console.log(message.sid));
   	}
}

module.exports = TwilioEvents;