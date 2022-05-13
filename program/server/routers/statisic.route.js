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
    const { eName, year, month } = req.body;

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
      if (new Date(allSold.rows[i].startDate).getFullYear() === Number(year)) {
        if (
          elements.has(
            allSold.rows[i].startDate.toLocaleString("default", {
              month: "long",
            })
          )
        ) {
          let temp = elements.get(
            allSold.rows[i].startDate.toLocaleString("default", {
              month: "long",
            })
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
    }
    const parseToJson = (value, key) => {
      result.push({ name: key, value: value });
    };
    elements.forEach(parseToJson);
    const monthRes = [];
    if (month !== undefined) {
      const monthElem = new Map();
      var months = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "отктябрь",
        "ноябрь",
        "декабрь",
      ];
      let days = new Date(year, months.indexOf(month) + 1, 0).getDate();
      console.log(days);
      for (let i = 1; i <= days; i++) {
        monthElem.set(i.toString(), 0);
      }
      const compliteDate = (value, key) => {
        for (let i = 0; i < allSold.rowCount; i++) {
          if (
            months.indexOf(month) ===
              new Date(allSold.rows[i].startDate).getMonth() &&
            Number(key) >= new Date(allSold.rows[i].startDate).getDate() &&
            Number(key) <= new Date(allSold.rows[i].endDate).getDate()
          ) {
            console.log(
              (new Date(allSold.rows[i].endDate) -
                new Date(allSold.rows[i].startDate)) /
                (1000 * 60 * 60 * 24)
            );
            value +=
              (allSold.rows[i].price * (60 * 60 * 1000 * 24)) /
              (new Date(allSold.rows[i].endDate) -
                new Date(allSold.rows[i].startDate));
          }
        }

        monthRes.push({ name: key, value: value });
      };
      monthElem.forEach(compliteDate);
      return res.status(201).json({ data: result, month: monthRes });
    }
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

//* /api/stat/getMonth
router.get("/getMonth", async (req, res) => {
  const years = await db.query('SELECT "startDate", "endDate" FROM orders');
  if (years.rowCount === 0) {
    return res.status(201).json({ years: 2022 });
  }
  const result = [];
  const element = new Map();

  for (let i = 0; i < years.rowCount; i++) {
    if (
      !element.has(
        new Date(years.rows[i].startDate).toLocaleString("default", {
          month: "long",
        })
      )
    ) {
      element.set(
        new Date(years.rows[i].startDate).toLocaleString("default", {
          month: "long",
        }),
        new Date(years.rows[i].startDate).toLocaleString("default", {
          month: "long",
        })
      );
    }
  }
  const parseToJson = (value) => result.push(value);
  element.forEach(parseToJson);
  res.status(201).json({ month: result });
});
//* /api/stat/getYears
router.get("/getYears", async (req, res) => {
  const years = await db.query('SELECT "startDate", "endDate" FROM orders');
  if (years.rowCount === 0) {
    return res.status(201).json({ years: 2022 });
  }
  const result = [];
  const element = new Map();

  for (let i = 0; i < years.rowCount; i++) {
    if (!element.has(new Date(years.rows[i].startDate).getFullYear())) {
      element.set(
        new Date(years.rows[i].startDate).getFullYear(),
        new Date(years.rows[i].startDate).getFullYear()
      );
    }
  }
  const parseToJson = (value) => result.push(value);
  element.forEach(parseToJson);
  res.status(201).json({ years: result });
});

module.exports = router;
