import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

const AddEquipModal = () => {
  const [open, setOpen] = useState(false);
  const [formEquip, setFormEquip] = useState({
    category: "",
    name: "",
    price: 0,
    decription: null,
    priceForHour: 0,
    number: 1,
  });

  const handleChangeForm = (event) => {
    setFormEquip({ ...formEquip, [event.target.name]: event.target.value });
    if (event.target.name === "price") {
      setFormEquip({
        ...formEquip,
        priceForHour: (event.target.value / 100) * 15,
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button color="info" onClick={handleClickOpen} variant="contained">
        Добавить оборудование
      </Button>
      <Dialog
        open={open}
        onClose={handleClickClose}
        maxWidth="xl"
        fullWidth
        PaperProps={{ sx: { height: "80%" } }}
      >
        <DialogTitle>Добавление оборудования</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>Выберите категорию:</Typography>
            <FormControl variant="standard" sx={{ m: 1, maxWidth: 300 }}>
              <InputLabel>Категория:</InputLabel>
              <Select
                value={formEquip.category}
                name="category"
                onChange={handleChangeForm}
                label="Категория:"
                autoWidth
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
            <Typography>Введите название товара:</Typography>
            <TextField
              variant="standard"
              name="name"
              onChange={handleChangeForm}
              sx={{ ml: 1, maxWidth: 500 }}
              label="Наименование:"
              helperText={`Пользователь увидит: ${formEquip.category} ${formEquip.name}`}
            ></TextField>
            <Typography>Введите цену за которую куплен товар:</Typography>
            <TextField
              variant="standard"
              name="price"
              type="number"
              error={Number.isNaN(formEquip.price)}
              InputLabelProps={{ shrink: true }}
              onChange={handleChangeForm}
              sx={{ ml: 1, maxWidth: 300 }}
              label="Цена покупки:"
            />
            <Typography>Введите цену аренды за час:</Typography>
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
            <Typography>Введите Описание товара:</Typography>
            <TextField
              variant="standard"
              name="decription"
              type="text"
              onChange={handleChangeForm}
              sx={{ ml: 1 }}
              multiline
              label="Описание:"
            />
            <Typography>Введите колличество товара:</Typography>
            <TextField
              variant="standard"
              name="decription"
              type="number"
              value={formEquip.number}
              InputLabelProps={{ shrink: true }}
              onChange={handleChangeForm}
              sx={{ ml: 1 }}
              label="Колличество:"
            />
            <Button>Сохранить</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEquipModal;
