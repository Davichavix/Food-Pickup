// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const database = require('./routes/databaseHelpers');
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require('./routes/users');
const signInRoutes = require('./routes/signin');



// PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api", apiRoutes());
app.use("/signin", signInRoutes())
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  database
  .getAllItems()
  .then((items) => {
    let templateVars = {
      items: items
    }
    res.render('index', templateVars)})
  .catch((e) => {
    console.log(e);
    res.send(e);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});