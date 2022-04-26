const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

const router = new Router();

// */api/user/getRole
router.get("/getRole", auth, async (req, res) => {
  try {
    console.log(req.userAuth.userId);
    const uRole = await db.query('SELECT "uRole" FROM users WHERE "id" = $1', [
      req.userAuth.userId,
    ]);
    if (uRole.rowCount == 0) {
      return res
        .status(400)
        .json({ message: "Невозомжно получить уровень привелегий" });
    }
    return res.status(201).json({ uRole: uRole.rows[0].uRole });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/sign
router.get("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
