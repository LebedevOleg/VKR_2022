import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";

const ChangeEquipModal = (data) => {
  const [open, setOpen] = useState(false);
  const [formEquip, setFormEquip] = useState({
    category: "",
    name: "",
    price: 0,
    description: null,
    priceForHour: 0,
    number: 1,
  });
  const optionsMap = new Map();
  const handleClickOpen = () => {
    setOpen(true);
    handleGetInfo();
  };
  const handleChangeForm = (event) => {
    if (event.target.name === "price") {
      setFormEquip({
        ...formEquip,
        [event.target.name]: Number(event.target.value),
        priceForHour: (event.target.value / 100) * 15,
      });
    } else {
      setFormEquip({ ...formEquip, [event.target.name]: event.target.value });
    }
  };

  const handleGetInfo = useCallback(async () => {
    await axios.post("/api/item/getItem", { id: data.id }).then((res) => {
      setFormEquip({
        ...formEquip,
        category: res.data.item.eCategory,
        name: res.data.item.eName,
        price: res.data.item.ePrice,
        description: res.data.item.eDescription,
        priceForHour: res.data.item.priceForHour,
      });
    });
    console.log(formEquip);
  }, [formEquip]);

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <IconButton onClick={handleClickOpen} color="primary">
        <CreateIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClickClose}
        maxWidth="xl"
        fullWidth
        PaperProps={{ sx: { height: "80%" } }}
      >
        <DialogTitle>Редактирование оборудования</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ width: 450 }}>
                <Typography>Выберите категорию:</Typography>
                <FormControl variant="standard" sx={{ m: 1, maxWidth: 300 }}>
                  <InputLabel>Категория:</InputLabel>
                  <Select
                    value={formEquip.category}
                    name="category"
                    onChange={handleChangeForm}
                    label="Категория:"
                    autoWidth
                    sx={{ minWidth: 250 }}
                  >
                    <MenuItem value="Студийные мониторы">
                      <em>Студийные мониторы</em>
                    </MenuItem>
                    <MenuItem value="Акустические системы активные">
                      <em>Акустические системы активные</em>
                    </MenuItem>
                    <MenuItem value="Акустические системы пассивные ">
                      <em>Акустические системы пассивные </em>
                    </MenuItem>
                    <MenuItem value="Аксессуары">
                      <em>Аксессуары</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                <Typography sx={{ mt: 0.5 }}>
                  Введите название товара:
                </Typography>
                <TextField
                  variant="standard"
                  name="name"
                  value={formEquip.name}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChangeForm}
                  sx={{ ml: 1, maxWidth: 500 }}
                  label="Наименование:"
                  helperText={`Пользователь увидит: ${formEquip.category} ${formEquip.name}`}
                ></TextField>
                <Typography sx={{ mt: 0.5 }}>
                  Введите цену за которую куплен товар:
                </Typography>
                <TextField
                  variant="standard"
                  name="price"
                  value={formEquip.price}
                  type="number"
                  error={Number.isNaN(formEquip.price)}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChangeForm}
                  sx={{ ml: 1, maxWidth: 300 }}
                  label="Цена покупки:"
                />
                <Typography sx={{ mt: 0.5 }}>
                  Введите цену аренды за час:
                </Typography>
                <TextField
                  variant="standard"
                  name="priceForHour"
                  type="number"
                  value={formEquip.priceForHour}
                  InputLabelProps={{ shrink: true }}
                  error={Number.isNaN(formEquip.priceForHour)}
                  onChange={handleChangeForm}
                  sx={{ ml: 1, maxWidth: 300 }}
                  label="Цена за час аренды:"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              ></Box>
            </Box>
            <Typography sx={{ mt: 0.5 }}>Введите Описание товара:</Typography>
            <TextField
              variant="standard"
              name="description"
              type="text"
              value={formEquip.description}
              InputLabelProps={{ shrink: true }}
              onChange={handleChangeForm}
              sx={{ ml: 1 }}
              multiline
              label="Описание:"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 3,
                ml: "35%",
              }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{
                  mt: 1,
                  
                  mr: 2,
                  maxWidth: 450,
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                Удалить
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  ml: 2,
                  maxWidth: 450,
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                Сохранить изменения
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeEquipModal;
