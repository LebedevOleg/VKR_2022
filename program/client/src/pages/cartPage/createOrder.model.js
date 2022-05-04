import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { setHours, setMinutes } from "date-fns";
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../context/authContext";
import SignInOrSignUp from "./signInOrSignUp";

export function CreateOrderModal(data) {
  const [openSign, setOpenSign] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateComplite, setDateComplite] = useState(true);
  const [complite, setComplite] = useState(true);
  const auth = useContext(AuthContext);
  const [addres, setAddres] = useState({
    city: "Москва",
    road: null,
    house: null,
    lat: null,
    lon: null,
  });
  const [systemAddres, setSystemAddres] = useState("");
  let price = 0;
  data.items.map((item) => (price += item.ePrice));

  const handleClickOpen = () => {
    setOpenSign(true);
  };
  const handleClickClose = () => {
    setEndDate(null);
    setDateComplite(true);
    setComplite(true);
    setOpenSign(false);
  };
  const urlStart = "https://nominatim.openstreetmap.org/search/";
  const urlEnd = "?format=json&addressdetails=1&limit=1&polygon_svg=1";
  const handleGetCoordinate = (event) => {
    setAddres({
      ...addres,
      [event.target.name]: event.target.value.replace(/[/ -.]/g, "+"),
    });
  };
  const getAddress = async () => {
    console.log(addres.road, addres.house);
    if (addres.house !== null && addres.road !== null) {
      await axios
        .get(
          urlStart +
            addres.house +
            "+" +
            addres.road +
            "+" +
            addres.city +
            urlEnd
        )
        .then((res) => {
          setSystemAddres(res.data[0].display_name);
          setAddres({
            ...addres,
            lat: res.data[0].lat,
            lon: res.data[0].lon,
          });
          console.log(addres);
        });
    }
  };
  const handleSaveOrder = async () => {
    await axios.post(
      "/api/cart/saveOrder",
      {
        startDate,
        endDate,
        addres,
        priceAll: price,
        priceComplite: (price / 100) * 15,
        items: data.items,
      },
      {
        headers: { Authorization: `Bearer ${auth.token}` },
      }
    );
  };

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen}>
        Заказать
      </Button>
      <Dialog
        open={openSign}
        onClose={handleClickClose}
        maxWidth="xl"
        fullWidth
        PaperProps={{ sx: { height: "80%" } }}
      >
        <DialogTitle>Заказ</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ pr: 5, borderRight: 1 }}>
            Выберите промежуток аренды
            <Box sx={{ mb: 1 }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                selectsStart
                showTimeSelect
                timeFormat="HH:mm"
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 23)}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd-MM-yyyy HH:mm"
              />
            </Box>
            <Box>
              {(endDate !== null &&
                startDate.getDate() === endDate.getDate() &&
                startDate.getMonth() === endDate.getMonth() &&
                startDate.getFullYear() === endDate.getFullYear() && (
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    showTimeSelect
                    minTime={setHours(
                      setMinutes(startDate, startDate.getMinutes()),
                      startDate.getHours()
                    )}
                    maxTime={setHours(setMinutes(startDate, 0), 23)}
                    timeFormat="HH:mm"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd-MM-yyyy HH:mm"
                  />
                )) || (
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  showTimeSelect
                  minTime={setHours(setMinutes(new Date(), 0), 6)}
                  maxTime={setHours(setMinutes(new Date(), 0), 23)}
                  timeFormat="HH:mm"
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd-MM-yyyy, HH:mm"
                />
              )}
            </Box>
            <Box>
              <Typography>
                Введите адрес, куда будет произовдится доставка
              </Typography>
              <TextField
                sx={{ ml: 1, width: "200px" }}
                size="small"
                label="Город"
                value="Москва"
                disabled
                name="city"
                variant="standard"
                placeholder="Введите адресс"
              />
              <TextField
                sx={{ ml: 1, width: "200px" }}
                size="small"
                label="улица"
                margin="dense"
                name="road"
                onChange={handleGetCoordinate}
                variant="standard"
              />
              <TextField
                sx={{ ml: 1, width: "200px" }}
                size="small"
                label="дом или строение"
                helperText="Пример: 5/1 к2"
                margin="dense"
                name="house"
                onChange={handleGetCoordinate}
                variant="standard"
              />
              <Button onClick={getAddress}>Зафиксировать адрес</Button>
            </Box>
            <Typography>
              Внимательно проверьте адресс зафиксированный системой
            </Typography>
            <Typography>Адрес: {systemAddres}</Typography>
            <Button
              onClick={() => {
                console.log(dateComplite);
                setDateComplite(false);
                console.log(dateComplite);
              }}
              disabled={!endDate}
            >
              Подтвердить время и место
            </Button>
          </Box>
          <Box sx={{ ml: 5, borderRight: 1, pr: 5 }}>
            Введите/Подтвердите ваши персональный данные
            <SignInOrSignUp setCheck={setComplite} check={dateComplite} />
          </Box>
          <Box sx={{ ml: 5 }}>
            Счет:
            <Stack spacing={0.2} divider={<Divider orientation="horizontal" />}>
              {data.items.map((item) => (
                <Typography>
                  {item.eName} -- Стоимость: {item.ePrice}
                </Typography>
              ))}
              <Typography>Итого: {price}</Typography>
              <Typography>
                К оплате авансом идет 15% от всей стоимости
              </Typography>
              <Typography>К оплате: {(price / 100) * 15} </Typography>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={complite} onClick={handleSaveOrder}>
            Подтвердить заявку
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
