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
      if (bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    });
  };

  router.get("/", (req, res) => {
    res.render("signin");
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email, password);
  });
  return router;
};
