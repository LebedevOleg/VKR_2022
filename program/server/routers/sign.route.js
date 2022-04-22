const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = new Router();

// */api/sign
router.post("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/sign/registr
router.post(
  "/registr",
  [check("password", "Минимальная длинна 4").trim().isLength({ min: 4 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ message: errors });
      }

      const { password, email, firstName, lastName, phone } = req.body;

      const token = jwt.sign(
        { userId: newPerson.rows[0].id },
        config.get("jwtSecret"),
        { expiresIn: "10d" }
      );
      return res
        .status(201)
        .json({
          token,
          uId: newPerson.rows[0].id,
          uRole: newPerson.rows[0].uRole,
        });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
);

// */api/sign
router.get("/", auth, async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
