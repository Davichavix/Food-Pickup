module.exports = (router, database) => {
  router.get("/", (req, res) => {
    if (!req.session.userId) {
      return res.send("Not Authorized!");
    }
    return res.render("checkout");
  });

  router.get("/complete", (req, res) => {
    if (!req.session.userId) {
      return res.send("Not Authorized!");
    }
    return res.render("checkout-complete");
  });
  return router;
};
