const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");
const { default: axios } = require("axios");

const router = new Router();

// */api/sign
router.post("/", async (req, res) => {
  try {
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/orders/getUOrders
router.get("/getUOrders", auth, async (req, res) => {
  try {
    const orders = await db.query(
      'SELECT id, "uId", "pId", "priceAll", "priceReady", "startDate", "endDate" FROM orders WHERE "uId"=$1',
      [req.userAuth.userId]
    );
    if (orders.rowCount === 0) {
      return res
        .status(201)
        .json({ message: "Вы еще не сделали ни одного заказа" });
    }
    const oPlace = [];
    for (let i = 0; i < orders.rowCount; i++) {
      await db
        .query('SELECT "pIat", "pIon" FROM place WHERE id=$1', [
          orders.rows[i].pId,
        ])
        .then(async (res) => {
          let lat = res.rows[0].pIat.toString();
          let lon = res.rows[0].pIon.toString();
          await axios
            .get(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
            )
            .then((result) => {
              oPlace.push(result.data.display_name);
            });
        });
    }
    res.status(201).json({ orders: orders.rows, places: oPlace });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
module.exports = router;
