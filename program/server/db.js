const Pool = require("pg").Pool;
///// ! пофиксить под созданную БД
const pool = new Pool({
  user: "postgres",
  password: "0000",
  host: "localhost",
  port: 5432,
  database: "VKR_2022_DB",
});

module.exports = pool;
