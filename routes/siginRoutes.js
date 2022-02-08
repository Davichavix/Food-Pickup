module.exports = (router) => {
  router.post("/", (req, res) => {
    if(req.body.email === 'user@email.com') {
      return res.redirect("/");
    } else {
      return res.redirect("/admin");
    }
  })
  return router;
};