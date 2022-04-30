const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");
const e = require("express");

const router = new Router();

// */api/user/getRole
router.get("/getRole", auth, async (req, res) => {
  try {
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

// */api/user/getUInfo
router.get("/getUInfo", auth, async (req, res) => {
  try {
    const uInfo = await db.query(
      'SELECT "uName", "uLastName", "uPhone", "uEmail"	FROM users WHERE "id" = $1',
      [req.userAuth.userId]
    );
    if (uInfo.rowCount == 0) {
      return res
        .status(400)
        .json({ message: "Невозомжно получить данные пользователя" });
    }
    return res.status(201).json({ uInfo: uInfo.rows[0] });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/user/changeInfoUser
router.post("/changeInfoUser", auth, async (req, res) => {
  try {
    const { uName, uLastName, uPhone, uEmail } = req.body;
    await db.query(
      'UPDATE users SET "uName"=$1, "uLastName"=$2, "uPhone"=$3, "uEmail"=$4 WHERE "id"=$5',
      [uName, uLastName, uPhone, uEmail, req.userAuth.userId]
    );
    res.status(201).json({ message: "Данные успешно изменены" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/user/changeUserPassword
router.post("/changeUserPassword", auth, async (req, res) => {
  try {
    const { oldPass, newPass } = req.body;
    const currPass = await db.query(
      'SELECT "uPassword" FROM users WHERE "id" = $1',
      [req.userAuth.userId]
    );
    const isMatch = await bcrypt.compare(oldPass, currPass.rows[0].uPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Текущий пароль введен неверно!" });
    }
    const hashedPassword = await bcrypt.hash(newPass, 12);
    await db.query('UPDATE users SET "uPassword"=$1 WHERE "id" =$2', [
      hashedPassword,
      req.userAuth.userId,
    ]);
    res.status(201).json({ message: "Пароль успешно изменен!" });
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
