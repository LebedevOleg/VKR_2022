import {
  Box,
  Button,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CreateOrderModal } from "./createOrder.model";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const GetCartItem = useCallback(async () => {
    const localCart = localStorage.getItem("cart");
    await axios
      .post("/api/cart/getCartItems", { items: localCart })
      .then((res) => {
        setCart(res.data.items);
      });
  }, []);

  const handleCreateOrder = async () => {};

  useEffect(() => {
    GetCartItem();
  }, [GetCartItem]);
  return (
    <>
      <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
        Корзина
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={7} sx={{ ml: 5 }}>
          <Box sx={{ backgroundColor: "#cfd8dc", flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Список товаров:
            </Typography>
            <Stack spacing={1.5}>
              {(cart !== null &&
                cart.map(
                  (item) =>
                    (item !== null && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          borderBottom: 1,
                          borderBlockColor: "#757575",
                        }}
                      >
                        <Typography variant="body1" component="div">
                          {item.eName}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ display: "flex", ml: "auto" }}
                        >
                          Стоимость: {item.ePrice}
                        </Typography>
                        <IconButton
                          aria-label="shopping cart"
                          sx={{ alignContent: "center" }}
                          id={item.id}
                          onClick={async () => {
                            let tempArray = [];

                            tempArray = localStorage.getItem("cart").split(",");
                            let index = tempArray.indexOf(toString(item.id));
                            tempArray.splice(index, 1);

                            localStorage.setItem("cart", tempArray);
                            GetCartItem();
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Box>
                    )) || (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          borderBottom: 1,
                          borderBlockColor: "#757575",
                        }}
                      >
                        {" "}
                        <Typography variant="body1" component="div">
                          В Корзине нет товара
                        </Typography>{" "}
                      </Box>
                    )
                )) || (
                <Skeleton
                  variant="rectangular"
                  sx={{ m: 2 }}
                  width={"99%"}
                  height={250}
                />
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {cart !== null && <CreateOrderModal items={cart} />}
    </>
  );
};

export default CartPage;
