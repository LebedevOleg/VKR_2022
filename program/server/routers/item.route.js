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

// */api/item/getItem
router.post("/getItem", async (req, res) => {
  try {
    const { id } = req.body;
    const item = await db.query('SELECT * FROM equipment WHERE "id"=$1', [id]);
    if (item.rowCount === 0) {
      return res.status(201).json({ message: "Ошибка в получении данных" });
    }
    res.status(201).json({ item: item.rows[0] });
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

// */api/item/getCategory
router.post("/getCategory", async (req, res) => {
  try {
    const { id } = req.body;
    const category = await db.query(
      'SELECT "eCategory" FROM equipment WHERE "id" =$1',
      [id]
    );
    res.status(201).json({ category: category.rows[0].eCategory });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/item/getOptions
router.post("/getOptions", async (req, res) => {
  try {
    const { id } = req.body;
    const options = await db.query(
      'SELECT id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "eId", "oValueName" FROM options WHERE "eId"=$1 ORDER BY id ASC',
      [id]
    );
    if (options.rowCount === 0) {
      return res.status(201).json({
        result:
          "Характеристике объекта еще не внесены, просим прощения за предоставленные неудобства",
      });
    }
    res.status(201).json({ options: options.rows });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
// */api/item/getOptionsSort
router.post("/getOptionsSort", async (req, res) => {
  try {
    const { id } = req.body;
    const options = await db.query(
      'SELECT id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "eId", "oValueName" FROM options WHERE "eId"=$1 order by "oName" ASC',
      [id]
    );
    if (options.rowCount === 0) {
      return res.status(201).json({
        result:
          "Характеристике объекта еще не внесены, просим прощения за предоставленные неудобства",
      });
    }
    res.status(201).json({ options: options.rows });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
