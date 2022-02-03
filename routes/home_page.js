const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM items`)
      .then(data => {
        const items = data.rows;
        console.log(items)
        const templateVars = {
          items: items,
        };
        return res.render("BubbleTea", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
