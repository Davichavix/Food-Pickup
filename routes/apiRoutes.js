module.exports = function (router, database) {
  router.get("/", (req, res) => {
    database
      .getAllItems()
      .then((items) => res.send(JSON.stringify(items)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/items", (req, res) => {
    database
      .getAllItems()
      .then((items) => res.send(JSON.stringify(items)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/items/:id", (req, res) => {
    database
      .getItemById(req.params.id)
      .then((item) => res.send(JSON.stringify(item)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  // router.get("/image/:id", (req, res) => {
  //   database
  //     .getItemById(req.params.id)
  //     .then((item) => {
  //       const { image_url } = item;
  //       res.sendFile(image_url, {root: './public'});
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       res.send(e);
  //     });
  // });

  router.get("/users/:email", (req, res) => {
    database
      .getUserByEmail(req.params.email)
      .then((user) => res.send(JSON.stringify(user)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/users/id/:id", (req, res) => {
    database
      .getUserById(req.params.id)
      .then((user) => res.send(JSON.stringify(user)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/orders/:id", (req, res) => {
    database
      .getAllOrdersByUserId(req.params.id)
      .then((orders) => res.send(JSON.stringify(orders)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/orders/user/:id", (req, res) => {
    database
      .getAllOrdersByUserId(req.params.id)
      .then((orders) => res.send(JSON.stringify(orders)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/orders/items/:id", (req, res) => {
    database
      .getAllItemsByOrderId(req.params.id)
      .then((items) => res.send(JSON.stringify(items)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/admin", (req, res) => {
    database
      .getAllOrdersOwner()
      .then((orders) => res.send(JSON.stringify(orders)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/admin/open", (req, res) => {
    database
      .getAllOpenOrders()
      .then((orders) => res.send(JSON.stringify(orders)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.post("/users", (req, res) => {
    const user = { ...req.body };

    database
      .addUser(user)
      .then((user) => res.send(JSON.stringify(user)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  //will need to complete this as we approach cart screen
  router.post("/orders", (req, res) => {
    const userId = 1;
    const createdAt = new Date(Date.now()) / 1000;

    database
      .addOrder({ userId, createdAt })
      .then((order) => {
        // console.log(order.id);
        res.send(order);
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.put("/orders/:id", (req, res) => {
    const orderId = req.params.id;
    const time = new Date(Date.now())/1000; //Test Code, Will need to add in time

    database
      .updateReadyTimeById(orderId, time)
      .then((order) => res.send(order))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.put("/orders/complete/:id", (req, res) => {
    const orderId = req.params.id;

    database
      .completeOrder(orderId)
      .then((order) => res.send(order))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  return router;
};
