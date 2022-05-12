const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

const router = new Router();

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
    const items = new Map();
    let minPrice = itemsArray.rows[0].priceForHour;
    let maxPrice = itemsArray.rows[0].priceForHour;
    for (let i = 0; i < itemsArray.rowCount; i++) {
      if (minPrice > itemsArray.rows[i].priceForHour) {
        minPrice = itemsArray.rows[i].priceForHour;
      }
      if (maxPrice < itemsArray.rows[i].priceForHour) {
        maxPrice = itemsArray.rows[i].priceForHour;
      }
      if (items.has(itemsArray.rows[i].eName)) {
        if (
          items.get(itemsArray.rows[i].eName).eUsed >= itemsArray.rows[i].eUsed
        ) {
          items.set(itemsArray.rows[i].eName, itemsArray.rows[i]);
        }
      } else {
        items.set(itemsArray.rows[i].eName, itemsArray.rows[i]);
      }
    }
    let array = Array.from(items, ([name, value]) => ({ name, value }));
    res.status(201).json({ items: array, maxPrice, minPrice });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/item/getFilterItems
router.post("/getFilterItems", async (req, res) => {
  try {
    const { price, category } = req.body;
    console.log(price, category);
    let itemsArray;
    if (category === "all") {
      itemsArray = await db.query(
        'SELECT * FROM equipment WHERE "priceForHour" <$2 and "priceForHour" >$1',
        [price[0], price[1]]
      );
    } else {
      itemsArray = await db.query(
        'SELECT * FROM equipment WHERE "priceForHour" <$2 and "priceForHour" >$1 and "eCategory" = $3',
        [price[0], price[1], category]
      );
    }
    console.log(itemsArray);
    const items = new Map();
    for (let i = 0; i < itemsArray.rowCount; i++) {
      if (items.has(itemsArray.rows[i].eName)) {
        if (
          items.get(itemsArray.rows[i].eName).eUsed >= itemsArray.rows[i].eUsed
        ) {
          items.set(itemsArray.rows[i].eName, itemsArray.rows[i]);
        }
      } else {
        items.set(itemsArray.rows[i].eName, itemsArray.rows[i]);
      }
    }
    let array = Array.from(items, ([name, value]) => ({ name, value }));
    res.status(201).json({ items: array });
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

// */api/item/getAllCategory
router.get("/getAllCategory", async (req, res) => {
  try {
    const categoryArr = await db.query('SELECT "eCategory" FROM equipment');
    const categorys = new Map();
    for (let i = 0; i < categoryArr.rowCount; i++) {
      if (!categorys.has(categoryArr.rows[i].eCategory)) {
        categorys.set(
          categoryArr.rows[i].eCategory,
          categoryArr.rows[i].eCategory
        );
      }
    }
    let array = Array.from(categorys, ([name, value]) => ({ name, value }));
    res.status(201).json({ category: array });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/item/getOptions
router.post("/getOptions", async (req, res) => {
  try {
    const { id } = req.body;
    const itemName = await db.query(
      'SELECT "eName" FROM equipment WHERE id = $1',
      [id]
    );
    const options = await db.query(
      'SELECT DISTINCT ON ("oName") "oName", options.id,  "oValueIntA", "oValueIntB", "oValueChar",options."eName", "oValueName"  FROM options INNER JOIN equipment USING ("eName") where options."eName" = $1 ORDER BY "oName" DESC',
      [itemName.rows[0].eName]
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
    const itemName = await db.query(
      'SELECT "eName" FROM equipment WHERE id = $1',
      [id]
    );
    const options = await db.query(
      'SELECT DISTINCT ON ("oName") "oName", options.id,  "oValueIntA", "oValueIntB", "oValueChar",options."eName", "oValueName"  FROM options INNER JOIN equipment USING ("eName") where options."eName" = $1 ORDER BY "oName" ASC',
      [itemName.rows[0].eName]
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
    //!option[0] - имя option, [1] - параметры
    const check = await db.query(
      'SELECT id, "oValueIntA", "oValueIntB" FROM options WHERE "oName" = $1 and "eId" =$2',
      [option[0], id]
    );
    console.log(check.rowCount, check.rows);
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
      if (option[1].oValueIntA === null && option[1].oValueIntB === null) {
        await db.query(
          'UPDATE options SET "oName"=$1, "oValueChar"=$2, "eId"=$3, "oValueName"=$4, "oValueIntA"=$5, "oValueIntB"=$6 WHERE "oName"=$1 and "eId"=$3',
          [
            option[1].oName,
            option[1].oValueChar,
            option[1].eId,
            option[1].oValueName,
            Number(check.rows[0].oValueIntA),
            Number(check.rows[0].oValueIntB),
          ]
        );
      } else if (
        option[1].oValueIntA === null &&
        option[1].oValueIntB !== null
      ) {
        await db.query(
          'UPDATE options SET "oName"=$1, "oValueChar"=$2, "eId"=$3, "oValueName"=$4, "oValueIntA"=$5, "oValueIntB"=$6 WHERE "oName"=$1 and "eId"=$3',
          [
            option[1].oName,
            option[1].oValueChar,
            option[1].eId,
            option[1].oValueName,
            Number(check.rows[0].oValueIntA),
            Number(option[1].oValueIntB),
          ]
        );
      } else if (
        option[1].oValueIntA !== null &&
        option[1].oValueIntB === null
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
      } else {
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

// */api/item/addItem
router.post("/addItem", async (req, res) => {
  try {
    const {
      category,
      name,
      price,
      description,
      priceForHour,
      number,
      options,
    } = req.body;
    for (let i = 0; i < number; i++) {
      await db.query(
        'INSERT INTO equipment( "eName", "ePrice", "eDescription", "eCategory", "priceForHour")	VALUES ( $1, $2, $3, $4, $5)',
        [category + " " + name, price, description, category, priceForHour]
      );
    }
    options.map(async (option) => {
      await db.query(
        'INSERT INTO options( "oName", "oValueChar", "eName", "oValueName", "oValueIntA", "oValueIntB") VALUES ( $1, $2, $3, $4, $5, $6)',
        [
          option[1].oName,
          option[1].oValueChar,
          category + " " + name,
          option[1].oValueName,
          Number(option[1].oValueIntA),
          Number(option[1].oValueIntB),
        ]
      );
    });
    res.status(201).json({ status: "OK" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// */api/item/getImage
router.post("/getImage", async (req, res) => {
  const { id } = req.body;
  const itemName = await db.query(
    'SELECT "eName", "eCategory" FROM equipment WHERE id = $1',
    [id]
  );
  const image = await db.query(
    'SELECT "fileName" FROM equip_image WHERE "eName" = $1',
    [itemName.rows[0].eName.slice(itemName.rows[0].eCategory.length + 1)]
  );
  if (image.rowCount === 0) {
    return res.status(201).json({
      status: "not",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficons8.cn%2Ficon%2FujQ2TKdWp5vZ%2Fempty-box&psig=AOvVaw2b_J1G_Tg8yVymwM5Kc4CQ&ust=1652359985085000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCHoeq-1_cCFQAAAAAdAAAAABAJ",
    });
  }
  res.status(201).json({ status: "ok", image: image.rows });
});

// */api/item/getAllItems
router.get("/getAllItems", async (req, res) => {
  const items = await db.query(
    'SELECT equipment.id, "eName", "ePrice", "eDescription", "eCategory", "pId", date_change, "priceForHour", "eUsed", place."pIat", place."pIon" FROM equipment left join place on "pId" = place.id order by equipment.id asc'
  );
  res.status(201).json({ items: items.rows });
});

// */api/item/findFreeItem
router.post("/findFreeItem", async (req, res) => {
  const { ids } = req.body;
  let freeID = new Map();
  const itemName = await db.query(
    'SELECT "eName" FROM equipment WHERE id = $1',
    [Number(ids[0])]
  );
  const AllID = await db.query('SELECT id FROM equipment where "eName" =$1', [
    itemName.rows[0].eName,
  ]);
  for (let i = 0; i < AllID.rowCount; i++) {
    if (!ids.includes(AllID.rows[i].id.toString())) {
      console.log(!ids.includes(AllID.rows[i].id.toString()), AllID.rows[i].id);
      freeID.set("next", AllID.rows[i].id);
    }
  }
  if (freeID.has("next")) {
    res.status(201).json({ nextID: [...freeID] });
  } else {
    res.status(201).json({ nextID: 0 });
  }
});

// */api/item/ChangeStatus
router.post("/ChangeStatus", async (req, res) => {
  const { status, id } = req.body;
  const lastStatus = await db.query(
    'SELECT "pId" FROM equipment where id = $1 ',
    [id]
  );
  if (status === 0 && lastStatus.rows[0].pId === null) {
    await db.query('UPDATE equipment	SET "pId"=$1, date_change=$2	WHERE id =$3', [
      0,
      new Date().toISOString(),
      id,
    ]);
  } else if (status === null) {
    if (lastStatus.rows[0].pId !== 0 && lastStatus.rows[0].pId !== null) {
      const eqOrder = await db.query(
        'SELECT "startDate", "endDate", "pId" FROM order_to_equipment inner join orders on "orderId" = orders.id where "eId" = $1 order by "startDate"',
        [id]
      );
      for (let i = 0; i < eqOrder.rowCount; i++) {
        if (new Date() < new Date(eqOrder.rows[i].endDate)) {
          return res.status(201).json({ message: "alert" });
        } else {
          await db.query(
            'UPDATE equipment	SET "pId"=$1, date_change=$2	WHERE id =$3',
            [, new Date().toISOString(), id]
          );
          await db.query('UPDATE place SET "dateOut"=$1 WHERE id=$2', [
            new Date().toISOString(),
            eqOrder.rows[i].pId,
          ]);
        }
      }
    } else {
      await db.query(
        'UPDATE equipment	SET "pId"=$1, date_change=$2	WHERE id =$3',
        [, new Date().toISOString(), id]
      );
    }
  } else if (status === 1 && lastStatus.rows[0].pId === null) {
    const eqOrder = await db.query(
      'SELECT "startDate", "endDate", "pId" FROM order_to_equipment inner join orders on "orderId" = orders.id where "eId" = $1 order by "startDate"',
      [id]
    );
    if (eqOrder.rowCount !== 0) {
      for (let i = 0; i < eqOrder.rowCount; i++) {
        if (new Date() > new Date(eqOrder.rows[i].startDate)) {
          await db.query(
            'UPDATE equipment	SET "pId"=$1, date_change=$2	WHERE id =$3',
            [eqOrder.rows[i].pId, new Date().toISOString(), id]
          );
          await db.query('UPDATE place SET "dateOn"=$1 WHERE id=$2', [
            new Date().toISOString(),
            eqOrder.rows[i].pId,
          ]);
          break;
        }
      }
    }
  }
  res.status(201).json({ message: "OK" });
});

module.exports = router;
