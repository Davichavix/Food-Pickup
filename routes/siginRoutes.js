module.exports = (router) => {
  router.post("/", (req, res) => {
    console.log(res)
    if(req.body.email === 'user@email.com') {
      return res.redirect("/");
    } else {
      return res.redirect("/admin/open");
    }
  })
  return router;
};