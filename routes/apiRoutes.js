module.exports = function (router, database) {
  router.get("/", (req, res) => {
    database
      .getAllItems()
      .then((items) => res.send(JSON.parse(items)))
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  return router;
};
