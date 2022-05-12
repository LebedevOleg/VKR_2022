const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

const router = new Router();

// */api/cart/getCartItems
router.post("/getCartItems", async (req, res) => {
  try {
    const { items } = req.body;

    const itemsArr = items.split(",");
    const result = [];
    for (let i = 0; i < itemsArr.length; i++) {
      await db
        .query(
          'SELECT id, "eName", "priceForHour" FROM equipment WHERE "id"=$1',
          [Number(itemsArr[i])]
        )
        .then((res) => {
          result.push(res.rows[0]);
        });
    }
    res.status(201).json({ items: result });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/cart/saveOrder
router.post("/saveOrder", auth, async (req, res) => {
  try {
    const { startDate, endDate, addres, priceAll, priceComplite, items } =
      req.body;

    console.log(startDate, endDate, addres, priceAll, priceComplite, items);
    const pId = await db.query(
      'INSERT INTO place("pIat", "pIon") VALUES ($1, $2) RETURNING id',
      [addres.lat, addres.lon]
    );

    const newOrder = await db.query(
      'INSERT INTO orders("uId", "startDate", "endDate", "pId", "priceAll", "priceReady") VALUES ($1, $2, $3, $4, $5, $6)  RETURNING id',
      [
        req.userAuth.userId,
        startDate,
        endDate,
        pId.rows[0].id,
        priceAll,
        priceComplite,
      ]
    );
    items.map(async (item) => {
      db.query(
        'INSERT INTO order_to_equipment("eId", "orderId", "price") VALUES ( $1, $2,$3)',
        [
          item.id,
          newOrder.rows[0].id,
          (item.priceForHour * (new Date(endDate) - new Date(startDate))) /
            (1000 * 60 * 60),
        ]
      );
    });
    res.status(201).json({ message: "complite add" });
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
