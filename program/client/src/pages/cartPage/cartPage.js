import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const GetCartItem = useCallback(async () => {
    const localCart = localStorage.getItem("cart");
    //localCart.push(localStorage.getItem("cart"));
    console.log(localCart);
    await axios
      .post("/api/cart/getCartItems", { items: localCart })
      .then((res) => {
        setCart(res.data.items);
      });
  }, []);
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
                cart.map((item) => (
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography variant="body1" component="div">
                      {item.eName}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ display: "flex", ml: "auto" }}
                    >
                      {item.ePrice}
                    </Typography>
                  </Box>
                ))) || (
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
      <Button variant="outlined" color="success">
        Забронировать
      </Button>
    </>
  );
};

export default CartPage;
