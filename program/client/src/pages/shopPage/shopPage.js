import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import ItemCard from "./itemCard";

const ShopPage = () => {
  const [itemArray, setItemArray] = useState([]);
  const [price, setPrice] = useState([0.0, 100.0]);
  const [category, setCategory] = useState("");
  const [filterForm, setFilterForm] = useState({
    price: [0.0, 50000.0],
    category: "all",
  });

  const handleGetItems = useCallback(async () => {
    await axios.get("/api/item/getItems").then((res) => {
      setItemArray(res.data.items);
      //setPrice([res.data.minPrice, res.data.maxPrice]);
    });
  }, []);

  //#region filter price
  const minDistance = 10;
  const handleChangePrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
    setFilterForm({ ...filterForm, price: [price[0] * 500, price[1] * 500] });
  };
  const calculatePriceFilter = (value) => {
    return value * 500;
  };
  //#endregion

  //#region category
  const [categoryList, setCategoryList] = useState([]);
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setFilterForm({ ...filterForm, category: event.target.value.toString() });
  };
  const handleGetCategorys = useCallback(async () => {
    await axios.get("/api/item/getAllCategory").then((res) => {
      setCategoryList(res.data.category);
    });
  }, []);
  //#endregion

  const handleGetFilterItems = async () => {
    console.log(filterForm);
    await axios
      .post("/api/item/getFilterItems", { ...filterForm })
      .then((res) => {
        setItemArray(res.data.items);
      });
  };

  useEffect(() => {
    handleGetCategorys();
    handleGetItems();
  }, [handleGetItems, handleGetCategorys]);

  return (
    <Box sx={{ flexGrow: 1, flexWrap: "wrap" }}>
      <div>
        <Toaster />
      </div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography> ?????????????? </Typography>
          <Box
            sx={{
              boxShadow: 2,
              backgroundColor: "#fffacf",
              m: 1,
              xs: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            ???????? ?????? ????????????????
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField
                size="small"
                variant="standard"
                value={price[0] * 500}
                disabled
              ></TextField>
              <Slider
                value={price}
                sx={{ width: "300px", ml: 2, mr: 2 }}
                valueLabelDisplay="auto"
                size="small"
                disableSwap
                scale={calculatePriceFilter}
                onChange={handleChangePrice}
                getAriaValueText={(value) => {
                  return `${value}??????`;
                }}
              />
              <TextField
                variant="standard"
                size="small"
                value={price[1] * 500}
                disabled
              ></TextField>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>??????????????????:</InputLabel>
                <Select
                  value={category}
                  onChange={handleChangeCategory}
                  label="??????????????????:"
                  autoWidth
                >
                  <MenuItem value="all">
                    <em>?????? ??????????????????</em>
                  </MenuItem>
                  {categoryList.map(
                    (item) =>
                      item !== null && (
                        <MenuItem value={item.value}>
                          <em>{item.value}</em>
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            </Box>
            <Button
              color="success"
              variant="outlined"
              sx={{ mb: 1, ml: 3, mr: 3 }}
              onClick={handleGetFilterItems}
            >
              ?????????????????? ??????????????
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={8}
          columns={{ xs: 4, sm: 12, md: 12 }}
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          {itemArray.map((item) => (
            <Grid item xs={3} sm={6} md={4} key={item.id}>
              <ItemCard item={item.value} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopPage;
