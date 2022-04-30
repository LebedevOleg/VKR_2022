import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  Input,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { Box, maxWidth } from "@mui/system";
import axios from "axios";
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../../context/authContext";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import { toast, Toaster } from "react-hot-toast";

const PhoneNumCustom = forwardRef(function PhoneNumCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+{7}(000)000-00-00"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    ></IMaskInput>
  );
});
PhoneNumCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const AccauntPage = () => {
  const [tab, setTab] = useState("1");
  const auth = useContext(AuthContext);
  const [uInfo, setUInfo] = useState({
    uName: null,
    uLastName: null,
    uPhone: "",
    uEmail: null,
  });
  const [uPass, setUPass] = useState({
    oldPass: null,
    newPass1: null,
    newPass2: null,
  });

  const handleChangePass = (event) => {
    setUPass({ ...uPass, [event.target.name]: event.target.value });
  };
  const handleChangeTabs = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangeInfo = (event) => {
    setUInfo({ ...uInfo, [event.target.name]: event.target.value });
  };
  const handleGetUserInfo = useCallback(async () => {
    await axios
      .get("/api/user/getUInfo", {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        setUInfo({
          uName: res.data.uInfo.uName,
          uLastName: res.data.uInfo.uLastName,
          uPhone: res.data.uInfo.uPhone,
          uEmail: res.data.uInfo.uEmail,
        });
      });
  }, []);
  const handleSaveChanges = async () => {
    await axios.post(
      "/api/user/changeInfoUser",
      { ...uInfo },
      {
        headers: { Authorization: `Bearer ${auth.token}` },
      }
    );
  };
  const handleSaveNewPass = async () => {
    if (uPass.newPass1 !== uPass.newPass2) {
      return toast.error("Новые пароли не совпадают!!", {
        position: "bottom-left",
      });
    }
    await axios
      .post(
        "/api/user/changeUserPassword",
        {
          oldPass: uPass.oldPass,
          newPass: uPass.newPass1,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((res) => {
        toast.success("Пароль успешно изменен", { position: "bottom-left" });
      });
  };
  useEffect(() => {
    handleGetUserInfo();
  }, [handleGetUserInfo]);
  return (
    <>
      <div>
        <Toaster />
      </div>
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
              <Tab label="Смена пароля" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            Данные о профиле
            {(uInfo.uEmail === null && <></>) || (
              <Stack spacing={1} divider={<Divider orientation="horizontal" />}>
                <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                  <Typography sx={{ p: 1 }}>
                    Имя:{" "}
                    <TextField
                      sx={{ ml: 1, width: "300px" }}
                      size="small"
                      name="uName"
                      defaultValue={uInfo.uName}
                      variant="standard"
                      onChange={handleChangeInfo}
                      placeholder="Введите имя"
                    />
                  </Typography>
                </Box>
                <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                  <Typography sx={{ p: 1 }}>
                    Фамилия:{" "}
                    <TextField
                      sx={{
                        ml: 1,
                        width: "300px",
                        maxWidth: "400px",
                        minWidth: "150px",
                      }}
                      name="uLastName"
                      size="small"
                      onChange={handleChangeInfo}
                      defaultValue={uInfo.uLastName}
                      variant="standard"
                      placeholder="Введите фамилию"
                    />
                  </Typography>
                </Box>
                <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                  <Typography sx={{ p: 1 }}>
                    Номер телефона:
                    <FormControl variant="standart">
                      <Input
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="uPhone"
                        onChange={handleChangeInfo}
                        value={uInfo.uPhone}
                        inputComponent={PhoneNumCustom}
                      />
                    </FormControl>
                  </Typography>
                </Box>
                <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                  <Typography sx={{ p: 1 }}>
                    Почта:
                    <TextField
                      sx={{ ml: 1, width: "300px" }}
                      size="small"
                      type="email"
                      name="uEmail"
                      onChange={handleChangeInfo}
                      defaultValue={uInfo.uEmail}
                      variant="standard"
                      placeholder="Введите email"
                    />
                  </Typography>
                </Box>
              </Stack>
            )}
            <Button sx={{ m: 1 }} onClick={handleSaveChanges}>
              Сохранить изменения
            </Button>
          </TabPanel>
          <TabPanel value="2">Информация о заказах</TabPanel>
          <TabPanel value="3">
            Смена пароля
            <Stack spacing={1} divider={<Divider orientation="horizontal" />}>
              <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                <Typography sx={{ p: 1 }}>
                  Старый пароль:
                  <TextField
                    sx={{ ml: 1, width: "300px" }}
                    size="small"
                    name="oldPass"
                    type="password"
                    variant="standard"
                    placeholder="Введите текузий пароль"
                    onChange={handleChangePass}
                  />
                </Typography>
              </Box>
              <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                <Typography sx={{ p: 1 }}>
                  Новый пароль:
                  <TextField
                    sx={{
                      ml: 1,
                      width: "300px",
                      maxWidth: "400px",
                      minWidth: "150px",
                    }}
                    name="newPass1"
                    size="small"
                    type="password"
                    variant="standard"
                    placeholder="Введите новый пароль"
                    onChange={handleChangePass}
                  />
                </Typography>
              </Box>
              <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                <Typography sx={{ p: 1 }}>
                  Повторите новый пароль:
                  <TextField
                    sx={{
                      ml: 1,
                      width: "300px",
                      maxWidth: "400px",
                      minWidth: "150px",
                    }}
                    name="newPass2"
                    size="small"
                    type="password"
                    variant="standard"
                    placeholder="Повторите новый пароль"
                    onChange={handleChangePass}
                  />
                </Typography>
              </Box>
            </Stack>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              onClick={handleSaveNewPass}
            >
              Изменить пароль
            </Button>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default AccauntPage;
