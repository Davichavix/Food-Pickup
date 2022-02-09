// const express = require('express');
// const router  = express.Router();


module.exports = (router, database) => {
  router.get("/", (req, res) => {
    if (!req.session.userId) {
      return res.redirect("/");
    }
    return res.render("cart");
  })
  return router;
};
