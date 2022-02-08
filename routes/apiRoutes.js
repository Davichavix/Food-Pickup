module.exports = function (router, database) {
  router.get("/", (req, res) => {
    database
      .getAllItems()
      .then((items) => res.send(items))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/items", (req, res) => {
    database
      .getAllItems()
      .then((items) => res.send(items))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/items/:id", (req, res) => {
    database
      .getItemById(req.params.id)
      .then((item) => res.send(item))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/users/email/:email", (req, res) => {
    database
      .getUserByEmail(req.params.email)
      .then((user) => res.send(user))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/users/id/:id", (req, res) => {
    database
      .getUserById(req.params.id)
      .then((user) => res.send(user))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/orders/:id", (req, res) => {
    database
      .getAllItemsByOrderId(req.params.id)
      .then((orders) => res.send(orders))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/orders/user/:id", (req, res) => {
    database
      .getAllOrdersByUserId(req.params.id)
      .then((orders) => res.send({ orders }))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/orders/details/:id", (req, res) => {
    database
      .getOrderDetailsByOrderId(req.params.id)
      .then((order) => res.send({ order }))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/orders/items/:id", (req, res) => {
    database
      .getAllItemsByOrderId(req.params.id)
      .then((items) => res.send(items))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/admin", (req, res) => {
    database
      .getAllOrdersOwner()
      .then((orders) => res.send(orders))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/admin/open", (req, res) => {
    database
      .getAllOpenOrders()
      .then((orders) => res.send(orders))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.get("/admin/history", (req, res) => {
    database
      .getAllHistoryOrders()
      .then((orders) => res.send(orders))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.post("/users", (req, res) => {
    const user = { ...req.body };

    database
      .addUser(user)
      .then((user) => res.send(user))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  //will need to complete this as we approach cart screen
  router.post("/orders", (req, res) => {
    const { userId, orderItems } = req.body;
    const createdAt = new Date();

    database
      .addOrder({ userId, createdAt })
      .then((order) => {
        const orderId = order.id;
        return database.addItemsToOrder(orderId, orderItems);
      })
      .then((data) => res.send(data))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.post("/orders/cancel/:id", (req, res) => {
    const{ id } = req.body;
    console.log("???");
    database
      .cancelOrder(id)
      .then((order) => res.send(order))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  router.post("/orders/:id", (req, res) => {
    const{ id, time } = req.body;
    console.log(time);

    database
      .updateReadyTimeById(id, time)
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

  router.get("/users/me", (req, res) => {
    const userId = req.session.userId;

    database
      .getUserById(userId)
      .then((user) => {
        const resUser = {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone_number,
          email: user.email,
        };
        res.send(resUser);
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  return router;
};
