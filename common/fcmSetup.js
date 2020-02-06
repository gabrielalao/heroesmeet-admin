
var FCM = require('fcm-node');
var serverKey = 'AAAAfxpcDl4:APA91bGL8O5vsO3rbiyLvJ3S7JhXmwdTvHwI3jDc0rfzZHKuf_OpWoHcgxQ6sXRYnRnw8nXM7q1uuLE2gdufGzyGYLwj610TVxWxJDboSvK-B8R9kQO2h8rcHB_-hQWkq7-dUTeSuqZS'; //put your server key here
var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'dBAqK2oOC4s:APA91bFZFsCM1N1Z6NUmCnDiEWOMNqMrZS9U5GZ0Br4cE2ctD81KHSyfYfxxVcP43gGpmtjnewVa7kzzp3t_sUdeIfG62ipBzhvODRyfPEUJ--yQNs7AbbDDpalVeNgtyA3lU2xzuUvn', 
    //collapse_key: 'your_collapse_key',
    
    notification: {
        title: 'Test notification', 
        body: 'Hello from heros meet' 
    },
    
    // data: {  //you can send only notification or only data(or include both)
    //     my_key: 'my value',
    //     my_another_key: 'my another value'
    // }
};

var FCMEvents = {

    // sendMedicineReminderNotification: function(){
    //     fcm.send(message, function(err, response){
    //         if (err) {
    //             console.log("Something has gone wrong!");
    //         } else {
    //             console.log("Successfully sent with response: ", response);
    //         }
    //     });
    // },
}

module.exports = FCMEvents;

