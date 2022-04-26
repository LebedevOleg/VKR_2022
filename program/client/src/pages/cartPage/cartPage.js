import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const CartPage = () => {
  return (
    <>
      <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
        Корзина
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Box sx={{ backgroundColor: "#cfd8dc", flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Список товаров:
            </Typography>
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
