const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

const router = new Router();

// */api/sign
router.post("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/item/getItems
router.get("/getItems", async (req, res) => {
  try {
    const itemsArray = await db.query("SELECT * FROM equipment");
    res.status(201).json({ items: itemsArray.rows });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
module.exports = router;
