module.exports = (router, database) => {
  router.get("/", (req, res) => {
    return res.render("checkout");
  });

  router.get("/complete", (req, res) => {
    return res.render("checkout-complete");
  });
  return router;
};
