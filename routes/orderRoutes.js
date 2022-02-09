module.exports = (router, database) => {
  router.get("/:user_id", (req, res) => {
    console.log(req.params.user_id);
    console.log(req.session.userId);
    if (req.params.user_id == req.session.userId) {
      res.render("user_orders");
      return;
    }

    res.send("Not authorized!");
  });

  router.get("/:user_id/:order_id", (req, res) => {
    if (req.params.user_id == req.session.userId) {
      res.render("user_orders_id");
      return;
    }

    res.send("Not authorized!");
  });

  return router;
};
