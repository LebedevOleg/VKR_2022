import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import AddEquipModal from "./addEquip.modal";

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
          <Box>
            Добавление оборудования в магазин аренды
            <Box>
              <AddEquipModal />
            </Box>
          </Box>
          <Box>
            Тестовое место для карты
            <YMaps>
              <Map
                defaultState={{
                  center: [55.6905557, 37.5830459],
                  zoom: 17,
                }}
              ></Map>
            </YMaps>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminPage;
