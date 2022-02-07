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
      let readyTime = DateToString(order[0]['created_at']);
      sendTextMessageToUser(userName, orderID, readyTime);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
  })

  router.get("/users/:id", (req, res) => {
    const orderID = req.params.id;
  database
    .getAllItemsByOrderId(orderID)
    .then((order) => {
      res.send(order)
      // let userName = 'Siyi Xie';
      // let readyTime = DateToString(order[0]['created_at']);
      // sendTextMessageToAdmin(userName, orderID, readyTime);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
  })

  return router;
};

const sendTextMessageToUser = function(Name, OrderId, readyTime) {
  client.messages
  .create({
     body: `Hi ${Name}, Your Order #${OrderId} is confirmed and will be ready at ${readyTime}`,
     from: '+19106315897',
     to: '+17809830537'
   })
  .then(message => console.log(message.sid))
  .catch((e) => {
    console.log(e);
    res.send(e);
  });
}

const sendTextMessageToAdmin = function(Name, OrderId, items) {
  client.messages
  .create({
     body: `Name: ${Name}, Order#${OrderId} Items:${items.join("").split(", ")}`,
     from: '+19106315897',
     to: '+17809830537'
   })
  .then(message => console.log(message.sid))
  .catch((e) => {
    console.log(e);
    res.send(e);
  });
}

const DateToString = (Date) => {
  return Date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}