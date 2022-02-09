const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (router, database) => {
  router.get("/admin/:id", (req, res) => {
    const orderID = req.params.id;
  database
    .getOrderDetailsByOrderId(orderID)
    .then((order) => {
      res.send(order)
      let userName = order[0]['user_name'];
      let readyTime = DateToString(order[0]['ready_at']);
      // sendTextMessageToUser(userName, orderID, readyTime);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
  })

  router.get("/users/:id", (req, res) => {
    const orderID = req.params.id;
  database
    .getAllItemsByOrderIdandName(orderID)
    .then((order) => {
      res.send(order);
      let userName = order[0].user_name;
      let orderItems = (getItemsFromOrder(order));
      // sendTextMessageToAdmin(userName, orderID, orderItems);
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
     body: `Name: ${Name}, Order#${OrderId} Items:${items}`,
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

const getItemsFromOrder = (itemsArray) => {
  const itemString = itemsArray.map((item) => {
    return ` ${item.name} x ${item.qty} `;
  })
  return itemString.join(",");
}
