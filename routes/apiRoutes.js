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

  // router.get("/orders/items/:id", (req, res) => {
  //   database
  //     .getAllItemsByOrderId(req.params.id)
  //     .then((items) => res.send(JSON.stringify(items)))
  //     .catch((e) => {
  //       console.log(e);
  //       res.send(e);
  //     });
  // });



  return router;
};
