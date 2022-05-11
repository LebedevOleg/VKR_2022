import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

const ItemCard = (data) => {
  //data.item - туда приходят данные
  const [disable, setDisable] = useState(false);
  const handleSaveItem = async () => {
    const cartArray = [];
    if (localStorage.getItem("cart")) {
      cartArray.push(localStorage.getItem("cart"));
      if (cartArray[0].split(",").includes(data.item.id.toString())) {
        let tempArr = [];
        tempArr = cartArray[0].split(",");
        tempArr.push(data.item.id.toString());
        await axios
          .post("/api/item/findFreeItem", { ids: tempArr })
          .then((res) => {
            if (res.data.nextID !== 0) {
              cartArray.push(res.data.nextID[0][1]);
              localStorage.setItem("cart", cartArray);
            } else {
              setDisable(true);
              toast.error("Данный товар закончился!", {
                position: "bottom-left",
              });
            }
          });
      } else {
        cartArray.push(Number(data.item.id));
        localStorage.setItem("cart", cartArray);
      }
    } else {
      cartArray.push(Number(data.item.id));
      localStorage.setItem("cart", cartArray);
    }
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
        <Button size="small" disabled={disable} onClick={handleSaveItem}>
          В заказ
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
