require('dotenv').config({path: "../.env"});

const dbParams = require("../lib/db");
const { Pool } = require("pg");

console.log(dbParams);

const db = new Pool(dbParams);

db.query("SELECT * FROM users;").then((data) => console.log(data.rows));
