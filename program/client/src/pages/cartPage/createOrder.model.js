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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { setHours, setMinutes } from "date-fns";
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/authContext";
import SignInOrSignUp from "./signInOrSignUp";

export function CreateOrderModal(data) {
  const token = "2256f7337a24297300f30f6c84e4990efb76ddd6";
  const secret = "76249429c44e0cad78ead8fcf0e3896d85fa72c6";
  const [openSign, setOpenSign] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateComplite, setDateComplite] = useState(true);
  const [blockDate, setBlockDate] = useState([null, null]);
  const [complite, setComplite] = useState(true);
  const auth = useContext(AuthContext);
  const [addres, setAddres] = useState({
    address: null,
    lat: null,
    lon: null,
  });
  const [systemAddres, setSystemAddres] = useState("");
  let price = 0;
  if (data.items !== null && endDate !== null) {
    data.items.map((item) => {
      if (item !== null) {
        price += (item.priceForHour * (endDate - startDate)) / (1000 * 60 * 60);
      }
      if (price <= 6000) {
        price += 1500;
      }
    });
  }

  const handleClickOpen = async () => {
    await axios
      .post("/api/orders/getFreeDate", { items: data.items })
      .then((res) => {
        setBlockDate([res.data.startDate, res.data.endDate]);
      });
    setOpenSign(true);
  };
  const handleClickClose = () => {
    setEndDate(null);
    setDateComplite(true);
    setComplite(true);
    setOpenSign(false);
  };

  // !old not gold
  /*   const urlStart = "https://nominatim.openstreetmap.org/search/";
  const urlEnd = "?format=json&addressdetails=1&limit=1&polygon_svg=1"; */
  /* const handleGetCoordinate = (event) => {
    setAddres({
      ...addres,
      [event.target.name]: event.target.value.replace(/[/ -.]/g, "+"),
    });
  }; */
  const handleSaveOrder = async () => {
    await axios
      .post(
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
      )
      .then((res) => {
        localStorage.removeItem("cart");
        window.location = "/profile";
      })
      .catch((error) => {
        if (error.request) {
          toast.error(error.response.data.message, {
            position: "bottom-left",
          });
        }
      });
  };

  const handlerChangeAddress = (event) => {
    setAddres({ ...addres, address: event.target.value });
  };
  const handleGetAddress = async (event) => {
    await axios
      .post("/api/pars/addGeo", { query: addres.address })
      .then((res) => {
        setSystemAddres(res.data.address);
        setAddres({
          ...addres,
          address: res.data.address,
          lat: res.data.lat,
          lon: res.data.lon,
        });
      });
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
                minTime={setHours(setMinutes(new Date(Date.now()), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 23)}
                excludeDateIntervals={
                  blockDate[0] !== null && [
                    {
                      start: new Date(blockDate[0]),
                      end: new Date(blockDate[1]),
                    },
                  ]
                }
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd-MM-yyyy HH:mm"
              />
            </Box>
            <Box>
              {(endDate !== null &&
                startDate !== null &&
                startDate.getDate() === endDate.getDate() &&
                startDate.getMonth() === endDate.getMonth() &&
                startDate.getFullYear() === endDate.getFullYear() && (
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                    selectsEnd
                    showTimeSelect
                    excludeDateIntervals={
                      blockDate[0] !== null && [
                        {
                          start: new Date(blockDate[0]),
                          end: new Date(blockDate[1]),
                        },
                      ]
                    }
                    minTime={setHours(
                      setMinutes(startDate, startDate.getMinutes()),
                      startDate.getHours()
                    )}
                    maxTime={setHours(setMinutes(startDate, 0), 23)}
                    timeFormat="HH:mm"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="dd-MM-yyyy HH:mm"
                  />
                )) || (
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                  selectsEnd
                  excludeDateIntervals={
                    blockDate[0] !== null && [
                      {
                        start: new Date(blockDate[0]),
                        end: new Date(blockDate[1]),
                      },
                    ]
                  }
                  showTimeSelect
                  minTime={setHours(setMinutes(new Date(), 0), 6)}
                  maxTime={setHours(setMinutes(new Date(), 0), 23)}
                  timeFormat="HH:mm"
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  dateFormat="dd-MM-yyyy, HH:mm"
                />
              )}
            </Box>
            <Box>
              <Typography>
                Введите адрес, куда будет произовдится доставка
              </Typography>
              <TextField
                sx={{ ml: 1, width: 400 }}
                size="small"
                label="Адрес"
                name="city"
                onChange={handlerChangeAddress}
                variant="standard"
                placeholder="Введите адресс"
              />
            </Box>
            <Button onClick={handleGetAddress}>Подтвердить адрес</Button>
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
              disabled={
                !endDate ||
                systemAddres === "" ||
                systemAddres === null ||
                !startDate
              }
            >
              Подтвердить время и место
            </Button>
          </Box>
          <Box sx={{ ml: 4, borderRight: 1, pr: 4 }}>
            Введите/Подтвердите ваши персональный данные
            <SignInOrSignUp setCheck={setComplite} check={dateComplite} />
          </Box>
          <Box sx={{ ml: 4 }}>
            Счет:
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Наименование</TableCell>
                  <TableCell>Цена/час</TableCell>
                  <TableCell>Итого</TableCell>
                </TableRow>
              </TableHead>
              {data.items.map(
                (item) =>
                  item !== null && (
                    <TableBody>
                      <TableCell>{item.eName}</TableCell>
                      <TableCell>{item.priceForHour} руб/час</TableCell>
                      <TableCell>
                        {endDate !== null &&
                          (item.priceForHour * (endDate - startDate)) /
                            (1000 * 60 * 60)}{" "}
                        руб
                      </TableCell>
                    </TableBody>
                  )
              )}
            </Table>
            <Stack spacing={0.2} divider={<Divider orientation="horizontal" />}>
              <Typography>Итого: {price}</Typography>
              <Typography>
                К оплате авансом идет 15% от всей стоимости
              </Typography>
              <Typography>К оплате: {(price / 100) * 15} </Typography>
            </Stack>
            <Typography variant="caption">
              Если сумма аренды вышла меньше 6тыс.руб, то доставка оплачивается
              дополнительно 1500руб
            </Typography>
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
/* 
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
              <Button onClick={getAddress}>Зафиксировать адрес</Button> */
