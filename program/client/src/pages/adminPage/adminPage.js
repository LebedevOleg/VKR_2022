import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";

const AdminPage = () => {
  return (
    <Box>
      <Typography gutterBottom variant="h5" component="div">
        Сервисная страница
      </Typography>
      <Box sx={{ width: "95%" }}>
        <Stack
          spacing={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Box>Статистика?? что-то сюда надо</Box>
          <Box>Добавление оборудования в магазин аренды</Box>
          <Box>
            Тестовое место для карты
            <YMaps>
              <Map
                defaultState={{ center: [55.69055, 37.58298], zoom: 12 }}
              ></Map>
            </YMaps>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminPage;
