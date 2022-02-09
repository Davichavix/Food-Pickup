module.exports = (router, database) => {
  router.get("/", (req, res) => {
    database.getUserById(req.session.userId).then((data) => {
      if (!data) {
        return res.send("Not Authorized!");
      }
      if (data.isowner == false) {
        return res.send("Not Authorized!");
      }
      if (data.isowner === true) {
        return res.render("admin_open");
      }
    });
  });

  router.get("/:id/confirm", (req, res) => {
    database.getUserById(req.session.userId).then((data) => {
      if (!data) {
        return res.send("Not Authorized!");
      }
      if (data.isowner == false) {
        return res.send("Not Authorized!");
      }
      if (data.isowner === true) {
        return res.render("admin_confirm");
      }
    });
  });

  router.get("/history", (req, res) => {
    database.getUserById(req.session.userId).then((data) => {
      if (!data) {
        return res.send("Not Authorized!");
      }
      if (data.isowner == false) {
        return res.send("Not Authorized!");
      }
      if (data.isowner === true) {
        res.render("admin_history");
      }
    });
  });

  router.get("/history/:id", (req, res) => {
    database.getUserById(req.session.userId).then((data) => {
      if (!data) {
        return res.send("Not Authorized!");
      }
      if (data.isowner == false) {
        return res.send("Not Authorized!");
      }
      if (data.isowner === true) {
        return res.render("admin_id");
      }
    });
  });
  return router;
};
