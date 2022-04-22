import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";

const SignModal = () => {
  const [openSign, setOpenSign] = useState(false);
  const [tabValue, setTabValue] = useState("0");
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpenSign(true);
  };
  const handleClickClose = () => {
    setOpenSign(false);
  };
  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangeEmail = (event) => {};

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Войти/Зарегестрироваться
      </Button>
      <Dialog open={openSign} onClose={handleClickClose}>
        <DialogTitle>Вход/Регистрация</DialogTitle>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTabs}
                aria-label="lab API tabs example"
              >
                <Tab label="Вход" value="0" />
                <Tab label="Регистрация" value="1" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <DialogContent>
                <DialogContentText>
                  Введите данные для входа или нажмите кнопку
                  зарегестрироваться.
                </DialogContentText>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Введите почту"
                    type="email"
                    fullWidth
                    variant="filled"
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <PasswordIcon
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    margin="dense"
                    id="password"
                    label="Введите пароль"
                    type="password"
                    fullWidth
                    variant="filled"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose}>Отмена</Button>
                <Button>Войти</Button>
              </DialogActions>
            </TabPanel>
            <TabPanel value="1">
              <DialogContent>
                <DialogContentText>
                  Введите данные для регестрировации.
                </DialogContentText>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="Введите имя"
                    type="text"
                    fullWidth
                    variant="filled"
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    margin="dense"
                    id="lastName"
                    label="Введите фамилию"
                    type="text"
                    fullWidth
                    variant="filled"
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    margin="dense"
                    id="email"
                    label="Введите почту"
                    type="email"
                    fullWidth
                    variant="filled"
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <PasswordIcon
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    margin="dense"
                    id="password"
                    label="Введите пароль"
                    type="password"
                    fullWidth
                    variant="filled"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose}>Отмена</Button>
                <Button>зарегистрироваться</Button>
              </DialogActions>
            </TabPanel>
          </TabContext>
        </Box>
      </Dialog>
    </div>
  );
};

export default SignModal;
