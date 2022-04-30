const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const router = new Router();

// */api/cart/getCartItems
router.post("/getCartItems", async (req, res) => {
  try {
    const { items } = req.body;
    const itemsArr = items.split(",");
    const result = [];
    for (let i = 0; i < itemsArr.length; i++) {
      await db
        .query('SELECT id, "eName", "ePrice" FROM equipment WHERE "id"=$1', [
          Number(itemsArr[i]),
        ])
        .then((res) => {
          result.push(res.rows[0]);
        });
    }
    res.status(201).json({ items: result });
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
