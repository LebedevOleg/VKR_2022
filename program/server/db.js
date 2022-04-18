const Pool = require("pg").Pool;
// ! пофиксить под созданную БД
const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "",
});

module.exports = pool;
