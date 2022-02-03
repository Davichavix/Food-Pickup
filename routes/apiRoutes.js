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
      .then((user) => res.send(user))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  return router;
};
