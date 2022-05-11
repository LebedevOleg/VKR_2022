import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, Stack, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import AddEquipModal from "./addEquip.modal";
import AllEquip from "./allEquip";
import Statistic from "./statictic";

const AdminPage = () => {
  const [tab, setTab] = useState("1");
  const handleChangeTabs = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box>
      <div>
        <Toaster />
      </div>
      <Typography gutterBottom variant="h5" component="div">
        Сервисная страница
      </Typography>
      <Box sx={{ width: "95%" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTabs}
              aria-label="lab API tabs example"
            >
              <Tab label="Добавление товаров" value="1" />
              <Tab label="Статистика" value="2" />
              <Tab label="Просмотр информации о всех товарах" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              Добавление оборудования в магазин аренды
              <Box>
                <AddEquipModal />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box>
              <Statistic />
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box>
              <AllEquip />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default AdminPage;
