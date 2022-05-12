const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

const router = new Router();

//* /api/stat/getSoldForYear
router.post("/getSoldForYear", async (req, res) => {
  try {
    const { eName } = req.body;
    const allSold = await db.query(
      'SELECT "eId", "orderId","price", orders."priceAll",orders."startDate",orders."endDate","eName" FROM public.order_to_equipment inner join orders on "orderId" = orders.id inner join equipment on "eId" = equipment.id where "eName"=$1 order by "startDate" ASC',
      [eName]
    );
    if (allSold.rowCount === 0) {
      return res.status(201).json({
        data: [
          { name: "Январь", value: 0 },
          { name: "Декабрь", value: 0 },
        ],
      });
    }
    new Date();
    const result = [];
    const elements = new Map([
      ["январь", 0],
      ["февраль", 0],
      ["март", 0],
      ["апрель", 0],
      ["май", 0],
      ["июнь", 0],
      ["июль", 0],
      ["август", 0],
      ["сентябрь", 0],
      ["октябрь", 0],
      ["ноябрь", 0],
      ["декабрь", 0],
    ]);

    for (let i = 0; i < allSold.rowCount; i++) {
      if (
        elements.has(
          allSold.rows[i].startDate.toLocaleString("default", { month: "long" })
        )
      ) {
        let temp = elements.get(
          allSold.rows[i].startDate.toLocaleString("default", { month: "long" })
        );
        temp += allSold.rows[i].price;
        elements.set(
          allSold.rows[i].startDate.toLocaleString("default", {
            month: "long",
          }),
          temp
        );
      } else {
        elements.set(
          allSold.rows[i].startDate.toLocaleString("default", {
            month: "long",
          }),
          allSold.rows[i].price
        );
      }
    }
    const parseToJson = (value, key) => {
      result.push({ name: key, value: value });
    };
    elements.forEach(parseToJson);
    console.log(result);
    res.status(201).json({ data: result });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});

//* /api/stat/GetCategoryStat
router.post("/GetCategoryStat", async (req, res) => {
  const { category } = req.body;
  const result = [];
  const elements = new Map();
  const allOrderInCategory = await db.query(
    'SELECT "eId", "orderId", "price", orders."priceAll",orders."startDate",orders."endDate", "eName", "eCategory" FROM public.order_to_equipment inner join orders on "orderId" = orders.id inner join equipment on "eId" = equipment.id where "eCategory" = $1 order by "startDate" ASC',
    [category]
  );
  if (allOrderInCategory.rowCount === 0) {
    return res.status(201).json({ message: "Товаров в данной категории нет" });
  }
  for (let i = 0; i < allOrderInCategory.rowCount; i++) {
    if (elements.has(allOrderInCategory.rows[i].eName)) {
      let element = elements.get(allOrderInCategory.rows[i].eName);
      element.allSold += allOrderInCategory.rows[i].price;
      element.count++;
      element.middleSold = element.allSold / element.count;
      elements.set(allOrderInCategory.rows[i].eName, element);
    } else {
      let element = {
        allSold: allOrderInCategory.rows[i].price,
        count: 1,
        middleSold: allOrderInCategory.rows[i].price / 1,
      };
      elements.set(allOrderInCategory.rows[i].eName, element);
    }
  }
  const parseToJson = (value, key) => {
    result.push({
      name: key,
      allSold: value.allSold,
      middleSold: value.middleSold,
    });
  };
  elements.forEach(parseToJson);
  res.status(201).json({ data: result });
});

module.exports = router;
