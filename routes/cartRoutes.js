// const express = require('express');
// const router  = express.Router();


module.exports = (router, database) => {
  router.get("/", (req, res) => {
    if (!req.session.userId) {
      return res.send("Not Authorized!");
    }
    return res.render("cart");
  })
  return router;
};
