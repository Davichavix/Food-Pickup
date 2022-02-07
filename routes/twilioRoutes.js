const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (router, database) => {
  router.get("/:id", (req, res) => {
    const orderID = req.params.id;
  database
    .getOrderDetailsByOrderId(orderID)
    .then((order) => {
      res.send(order)
      let userName = order[0]['user_name'];
      let readyTime = Date(order[0]['created_at']);
      // sendTextMessage(userName, orderID, readyTime);
    })
  })
  return router;
};

const sendTextMessage = function(Name, OrderId, readyTime) {
  client.messages
  .create({
     body: `Hi ${Name}, Your Order #${OrderId} is confirmed and will be ready at ${readyTime}`,
     from: '+19106315897',
     to: '+17809830537'
   })
  .then(message => console.log(message.sid));
}