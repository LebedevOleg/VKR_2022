import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ItemCard from "./itemCard";

const ShopPage = () => {
  const [itemArray, setItemArray] = useState([]);
  const [price, setPrice] = useState([0, null]);

  const handleGetItems = useCallback(async () => {
    await axios.get("/api/item/getItems").then((res) => {
      setItemArray(res.data.items);
      setPrice([res.data.minPrice, res.data.maxPrice]);
    });
  }, []);

  useEffect(() => {
    handleGetItems();
  }, [handleGetItems]);
  return (
    <Box sx={{ flexGrow: 1, flexWrap: "wrap" }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography> Фильтры </Typography>
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
            Блок для фильтров
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <TextField size="small"></TextField>
              <Slider
                getAriaLabel={() => "ценовой дипозон"}
                value={price}
                valueLabelDisplay="auto"
              />
              <TextField size="small"></TextField>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={9}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          {itemArray.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <ItemCard item={item.value} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopPage;
