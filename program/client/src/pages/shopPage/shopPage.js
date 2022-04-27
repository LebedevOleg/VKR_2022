import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ItemCard from "./itemCard";

const ShopPage = () => {
  const [itemArray, setItemArray] = useState([]);

  const handleGetItems = useCallback(async () => {
    await axios.get("/api/item/getItems").then((res) => {
      setItemArray(res.data.items);
    });
  }, []);

  useEffect(() => {
    handleGetItems();
  }, [handleGetItems]);
  return (
    <Box sx={{ flexGrow: 1, flexWrap: "wrap" }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Box
            sx={{
              boxShadow: 2,
              backgroundColor: "#fffacf",
              m: 1,
              xs: 1,
            }}
          >
            Блок для фильтров
          </Box>
        </Grid>
        <Grid item xs={9}>
          Блок для товаров
          {itemArray.map((item) => (
            <ItemCard item={item} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopPage;
