import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../../context/authContext";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";

const PhoneNumCustom = forwardRef(function PhoneNumCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+{7}(000)000-00-00"
      inputRef={ref}
      placeholder="Введите контактный номер"
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    ></IMaskInput>
  );
});
PhoneNumCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SignInOrSignUp = (data) => {
  const auth = useContext(AuthContext);
  const [uInfo, setUInfo] = useState({
    uName: null,
    uLastName: null,
    uPhone: "",
    uEmail: null,
  });
  const [uInfoCheck, setUInfoCheck] = useState({
    uName: null,
    uLastName: null,
    uPhone: "",
    uEmail: null,
  });
  const [formReg, setFormReg] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleChangeFormReg = (event) => {
    setFormReg({ ...formReg, [event.target.name]: event.target.value });
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
        setUInfoCheck({
          uName: res.data.uInfo.uName,
          uLastName: res.data.uInfo.uLastName,
          uPhone: res.data.uInfo.uPhone,
          uEmail: res.data.uInfo.uEmail,
        });
      });
  }, []);

  const handleCheckUInfo = async () => {
    if (
      uInfo.uEmail === uInfoCheck.uEmail &&
      uInfo.uName === uInfoCheck.uName &&
      uInfo.uLastName === uInfoCheck.uLastName &&
      uInfo.uPhone === uInfoCheck.uPhone
    ) {
      console.log(data);
      data.setCheck(false);
    } else {
      await axios.post(
        "/api/user/changeInfoUser",
        { ...uInfo },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      data.setCheck(false);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, [handleGetUserInfo]);
  if (auth.token !== null) {
    return (
      <>
        {(uInfo.uEmail === null && (
          <Skeleton
            variant="rectangular"
            sx={{ m: 2 }}
            width={"99%"}
            height={250}
          />
        )) || (
          <>
            {" "}
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
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="success"
              onClick={handleCheckUInfo}
              disabled={data.check}
            >
              Подтвердить данные
            </Button>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <Stack spacing={1} divider={<Divider orientation="horizontal" />}>
          Введите данные для регистрации
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
              variant="standard"
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
              label="Введите фамилию"
              type="text"
              fullWidth
              variant="standard"
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
              label="Введите почту"
              type="email"
              fullWidth
              variant="standard"
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
              label="Введите пароль"
              type="password"
              fullWidth
              variant="standard"
              name="password"
              onChange={handleChangeFormReg}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Typography>
              <LocalPhoneIcon
                sx={{ color: "action.active", mr: 1, my: 1 }}
                fontSize="large"
              />
              <FormControl variant="standart">
                <Input
                  margin="dense"
                  sx={{ ml: 1, width: "300px" }}
                  name="phone"
                  value={formReg.phone}
                  onChange={handleChangeFormReg}
                  inputComponent={PhoneNumCustom}
                />
              </FormControl>
            </Typography>
          </Box>
        </Stack>
        <Button sx={{ m: 1 }} variant="contained" color="success">
          Зарегистрироваться
        </Button>
      </>
    );
  }
};

export default SignInOrSignUp;
