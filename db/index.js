const { Pool } = require("pg");
const dbParams = require("../lib/db");


const pool = new Pool(dbParams);

module.exports = pool;
