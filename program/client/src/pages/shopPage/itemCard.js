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
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.item.eName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data.item.eDescription.slice(0, 100) + "..."}
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
        <Button size="small">В заказ</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
