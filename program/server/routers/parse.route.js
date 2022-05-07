const Router = require("express");
const config = require("config");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const rp = require("request-promise");
const cheerio = require("cheerio");
const { default: axios } = require("axios");
const opencage = require("opencage-api-client");

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

//* api/pars/addGeo
router.post("/addGeo", async (req, res) => {
  try {
    var url = "https://cleaner.dadata.ru/api/v1/clean/address";
    var token = "2256f7337a24297300f30f6c84e4990efb76ddd6";
    var secret = "76249429c44e0cad78ead8fcf0e3896d85fa72c6";
    var { query } = req.body;

    const address = await axios.post(url, JSON.stringify([query]), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
        "X-Secret": secret,
      },
    });
    res.status(201).json({
      address: address.data[0].result,
      lat: address.data[0].geo_lat,
      lon: address.data[0].geo_lon,
    });
  } catch (e) {
    res.json({ message: e.message });
  }
});

router.post("/test", async (req, res) => {
  var url = "https://dadata.ru/api/v1/suggest/address";
  var token = "2256f7337a24297300f30f6c84e4990efb76ddd6";
  var query = req.body;
  const address = await axios
    .post(
      url,
      { query: query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });

  /* res.status(201).json({
    address: address.data[0].result,
    lat: address.data[0].geo_lat,
    lon: address.data[0].geo_lon,
  }); */
});

module.exports = router;
