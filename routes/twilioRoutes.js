// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// module.exports = (router) => {
//   router.get("/", (req, res) => {
//     sendTextMessage();
//     return res.send("Hi");
//   })
//   return router;
// };

// const sendTextMessage = function() {
//   client.messages
//   .create({
//      body: 'Your Order will be ready in 30 min',
//      from: '+19106315897',
//      to: '+111111111111111'
//    })
//   .then(message => console.log(message.sid));
// }