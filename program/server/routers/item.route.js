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
      'SELECT id, "oName", "oValueIntA", "oValueIntB", "oValueChar", "eId", "oValueName" FROM options WHERE "eId"=$1 ORDER BY "oName" DESC',
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
// */api/item/updateOptions
router.post("/updateOptions", async (req, res) => {
  const { options, id } = req.body;
  options.map(async (option) => {
    //!option[0] - имя option[1] - параметры
    const check = await db.query(
      'SELECT id, "oValueIntA", "oValueIntB" FROM options WHERE "oName" = $1 and "eId" =$2',
      [option[0], id]
    );
    console.log(check);
    if (check.rowCount === 0) {
      await db.query(
        'INSERT INTO options( "oName", "oValueChar", "eId", "oValueName", "oValueIntA", "oValueIntB") VALUES ( $1, $2, $3, $4, $5, $6)',
        [
          option[1].oName,
          option[1].oValueChar,
          option[1].eId,
          option[1].oValueName,
          Number(option[1].oValueIntA),
          Number(option[1].oValueIntB),
        ]
      );
    } else {
      if (check.rows[0].oValueIntB === 0) {
        await db.query(
          'UPDATE options SET "oName"=$1, "oValueChar"=$2, "eId"=$3, "oValueName"=$4, "oValueIntA"=$5, "oValueIntB"=$6 WHERE "oName"=$1 and "eId"=$3',
          [
            option[1].oName,
            option[1].oValueChar,
            option[1].eId,
            option[1].oValueName,
            Number(option[1].oValueIntA),
            Number(option[1].oValueIntB),
          ]
        );
      } else if (
        check.rows[0].oValueIntB !== 0 &&
        option[0].oValueIntB === null
      ) {
        await db.query(
          'UPDATE options SET "oName"=$1, "oValueChar"=$2, "eId"=$3, "oValueName"=$4, "oValueIntA"=$5, "oValueIntB"=$6 WHERE "oName"=$1 and "eId"=$3',
          [
            option[1].oName,
            option[1].oValueChar,
            option[1].eId,
            option[1].oValueName,
            Number(option[1].oValueIntA),
            Number(check.rows[0].oValueIntB),
          ]
        );
      } else if (
        check.rows[0].oValueIntB !== 0 &&
        option[0].oValueIntB !== null
      ) {
        await db.query(
          'UPDATE options SET "oName"=$1, "oValueChar"=$2, "eId"=$3, "oValueName"=$4, "oValueIntA"=$5, "oValueIntB"=$6 WHERE "oName"=$1 and "eId"=$3',
          [
            option[1].oName,
            option[1].oValueChar,
            option[1].eId,
            option[1].oValueName,
            Number(option[1].oValueIntA),
            Number(option[1].oValueIntB),
          ]
        );
      }
    }
  });
  res.status(201);
});

module.exports = router;
