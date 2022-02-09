const bcrypt = require("bcrypt");

module.exports = (router, database) => {
  /**
   * Check if a user exists in db
   * @param {String} email
   * @param {String} password bcrypt string
   * @returns user object or null
   */

  const login = function (email, password) {
    return database.getUserByEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };

  router.get("/signin", (req, res) => {
    if (!req.session.userId) {
      return res.render("signin");
    }
    return res.redirect("/");
  });

  router.get("/signup", (req, res) => {
    if (!req.session.userId) {
      return res.render("signup");
    }
    return res.redirect("/");
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then((user) => {
        if (!user) {
          res.send({ error: "Not authorized!" });
          return;
        }
        req.session.userId = user.id;
        res.send({
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
            phone: user.phone_number,
            email: user.email,
            isOwner: user.isowner,
          },
        });
      })
      .catch((err) => console.log(err));
  });

  router.post("/signup", (req, res) => {
    const userInfo = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      phoneNumber: req.body.phone,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
    };
    database.addUser(userInfo).then((user) => {
      req.session.userId = user.id;
      res.send({
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone_number,
          email: user.email,
          isOwner: user.isowner,
        },
      });
    });
  });

  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  return router;
};
