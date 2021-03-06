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
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import toast, { Toaster } from "react-hot-toast";

const SignModal = () => {
  const [openSign, setOpenSign] = useState(false);
  const [tabValue, setTabValue] = useState("0");
  const auth = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [formReg, setFormReg] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const loginFunc = async () => {
    try {
      await axios
        .post("/api/sign/login", { ...formLogin })
        .then((res) => {
          console.log(res.data);
          auth.login(res.data.token, res.data.userId);
          window.location = "/account";
        })
        .catch((error) => {
          if (error.request) {
            toast.error(error.response.data.message.errors[0].msg, {
              position: "bottom-left",
            });
          }
        });
    } catch (e) {
      toast.error(e.message, { position: "bottom-left" });
    }
  };

  const regFunc = async () => {
    try {
      const registrData = await axios
        .post("/api/sign/registr", { ...formReg })
        .then((res) => {
          auth.login(registrData.data.token, registrData.data.userId);
          window.location = "/accountReg";
        })
        .catch((error) => {
          if (error.request) {
            toast.error(error.response.data.message.errors[0].msg, {
              position: "bottom-left",
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  //#region Handles
  const handleClickOpen = () => {
    setOpenSign(true);
  };
  const handleClickClose = () => {
    setOpenSign(false);
  };
  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangeFormLogin = (event) => {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  };
  const handleChangeFormReg = (event) => {
    setFormReg({ ...formReg, [event.target.name]: event.target.value });
  };
  //#endregion
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <Button color="inherit" onClick={handleClickOpen}>
        ??????????/????????????????????????????????????
      </Button>
      <Dialog open={openSign} onClose={handleClickClose}>
        <DialogTitle>????????/??????????????????????</DialogTitle>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTabs}
                aria-label="lab API tabs example"
              >
                <Tab label="????????" value="0" />
                <Tab label="??????????????????????" value="1" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <DialogContent>
                <DialogContentText>
                  ?????????????? ???????????? ?????? ?????????? ?????? ?????????????????? ???? ?????????????? ??????????????????????.
                </DialogContentText>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    autoFocus
                    name="email"
                    margin="dense"
                    id="email"
                    label="?????????????? ??????????"
                    type="email"
                    fullWidth
                    variant="filled"
                    onChange={handleChangeFormLogin}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <PasswordIcon
                    sx={{ color: "action.active", mr: 1, my: 1 }}
                    fontSize="large"
                  />
                  <TextField
                    name="password"
                    margin="dense"
                    id="password"
                    label="?????????????? ????????????"
                    type="password"
                    fullWidth
                    variant="filled"
                    onChange={handleChangeFormLogin}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose}>????????????</Button>
                <Button onClick={loginFunc}>??????????</Button>
              </DialogActions>
            </TabPanel>
            <TabPanel value="1">
              <DialogContent>
                <DialogContentText>
                  ?????????????? ???????????? ?????? ?????????????????????????????? ?????? ?????????????????? ???? ??????????????
                  ??????????.
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
                    label="?????????????? ??????"
                    type="text"
                    fullWidth
                    variant="filled"
                    name="firstName"
                    onChange={handleChangeFormReg}
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
                    label="?????????????? ??????????????"
                    type="text"
                    fullWidth
                    variant="filled"
                    name="lastName"
                    onChange={handleChangeFormReg}
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
                    label="?????????????? ??????????"
                    type="email"
                    fullWidth
                    variant="filled"
                    name="email"
                    onChange={handleChangeFormReg}
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
                    label="?????????????? ????????????"
                    type="password"
                    fullWidth
                    variant="filled"
                    name="password"
                    onChange={handleChangeFormReg}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose}>????????????</Button>
                <Button onClick={regFunc}>????????????????????????????????????</Button>
              </DialogActions>
            </TabPanel>
          </TabContext>
        </Box>
      </Dialog>
    </div>
  );
};

export default SignModal;
