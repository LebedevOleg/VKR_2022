import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const ItemCard = (data) => {
  //data.item - туда приходят данные
  console.log(data.item);
  const handleSaveItem = () => {
    const cartArray = [];
    if (localStorage.getItem("cart")) {
      cartArray.push(localStorage.getItem("cart"));
    }
    cartArray.push(Number(data.item.id));
    localStorage.setItem("cart", cartArray);
  };
  return (
    <Card sx={{ maxWidth: 450, m: 1 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.item.eName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data.item.eDescription.slice(0, 100) + "..."}
        </Typography>
        <Typography align="right" variant="h6">
          {data.item.priceForHour} руб./час
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            window.location = "/item:" + data.item.id;
          }}
        >
          Подробнее
        </Button>
        <Button size="small" onClick={handleSaveItem}>
          В заказ
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
