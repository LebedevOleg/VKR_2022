import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const AccauntPage = () => {
  const [tab, setTab] = useState("1");

  const handleChangeTabs = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      <Typography>Страница пользователя</Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTabs}
              aria-label="lab API tabs example"
            >
              <Tab label="Профиль" value="1" />
              <Tab label="Заказы" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">Данные о профиле</TabPanel>
          <TabPanel value="2">Информация о заказах</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default AccauntPage;
