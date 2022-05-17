const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const router = new Router();

// */api/sign/login
router.post(
  "/login",
  [
    check("password", "Пароль не может быть пустым").exists(),
    check("email", "Поле email не может быть пустым").trim().notEmpty(),
    check("email", "Поле email не является почтой").trim().isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ message: errors });
      }
      const { email, password } = req.body;
      const user = await db.query('SELECT * FROM users WHERE "uEmail" = $1', [
        email,
      ]);
      if (user.rowCount == 0) {
        return res
          .status(400)
          .json({ message: "Пользователя с такой почтой не существует!!" });
      }
      const isMatch = await bcrypt.compare(password, user.rows[0].uPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Пароль не верный!" });
      }
      const token = jwt.sign(
        { userId: user.rows[0].id },
        config.get("jwtSecret"),
        { expiresIn: "10d" }
      );
      return res.status(201).json({ token, userId: user.rows[0].id });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
);

// */api/sign/registr
router.post(
  "/registr",
  [
    check("password", "Минимальная длинна 4").trim().isLength({ min: 4 }),
    check("email", "Поле email не может быть пустым").trim().notEmpty(),
    check("email", "Поле email не является почтой").trim().notEmpty(),
    check("firstName", "Поле 'Имя' не может быть пустым").trim().notEmpty(),
    check("lastName", "Поле 'Фамилия' не может быть пустым").trim().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ message: errors });
      }

      const { password, email, firstName, lastName, phone } = req.body;

      const users = await db.query(
        'SELECT "uEmail" from users WHERE "uEmail" = $1',
        [email]
      );
      console.log(users.rowCount);
      if (users.rowCount != 0) {
        return res
          .status(400)
          .json({ message: "Пользователь с такой почтой уже существует" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      let newUser;
      if (phone === "") {
        newUser = await db.query(
          'INSERT INTO public.users("uName", "uLastName", "uEmail", "uPassword")VALUES ($1,$2,$3,$4) RETURNING id',
          [firstName, lastName, email, hashedPassword]
        );
      } else {
        newUser = await db.query(
          'INSERT INTO public.users("uName", "uLastName", "uEmail", "uPassword" ,"uPhone")VALUES ($1,$2,$3,$4, $5) RETURNING id',
          [firstName, lastName, email, hashedPassword, phone]
        );
      }

      const token = jwt.sign(
        { userId: newUser.rows[0].id },
        config.get("jwtSecret"),
        { expiresIn: "10d" }
      );
      return res.status(201).json({
        token,
        userId: newUser.rows[0].id,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
  }
);

module.exports = router;
