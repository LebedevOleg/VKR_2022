const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const rp = require("request-promise");
const cheerio = require("cheerio");

const router = new Router();

//* api/pars/addOptions
router.post("/addOptions", async (req, res) => {
  try {
    const { link } = req.body;
    rp(link).then(function (html) {
      let $ = cheerio.load(html);

      //const pArr = [];
      let array = $("#description");
      let option = $(array.children("div")).find("p")[4];

      /* console.log($(option).text()); */
      let textArr = $(option).text().split("\n");
      console.log(textArr);
      for (let i = 0; i < textArr.length; i++) {
        if (textArr[i] === "") {
          textArr.splice(i, 1);
        }
      }
      console.log(textArr);
      res.json($(option).html());
    });
  } catch (e) {
    res.json({ message: e.message });
  }
});

module.exports = router;
