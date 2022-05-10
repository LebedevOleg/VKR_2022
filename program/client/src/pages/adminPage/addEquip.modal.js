import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import axios from "axios";

const InputPhoto = styled("input")({ display: "none" });

const AddEquipModal = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [formEquip, setFormEquip] = useState({
    category: "",
    name: "",
    price: 0,
    decription: null,
    priceForHour: 0,
    number: 1,
  });
  const [url, setUrl] = useState("");

  const handleSaveEquip = async () => {
    await axios.post("", { ...formEquip });
  };

  const handleChangeForm = (event) => {
    console.log(event.target.name);
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

  const handleDownloadImage = async (event) => {
    await axios.post("api/pars/downloadImage", {
      url: url,
      fileName: formEquip.name.replace(" ", "_") + ".png",
    });
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
                sx={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <label htmlFor="contained-button-file">
                  <TextField
                    variant="standard"
                    size="small"
                    onChange={(event) => {
                      setUrl(event.target.value);
                    }}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ ml: 3, mr: 3 }}
                    onClick={handleDownloadImage}
                  >
                    загрузить фото
                  </Button>
                </label>
                {file !== "" && (
                  <img
                    src={file}
                    width={400}
                    height={400}
                    style={{ margin: 1 }}
                  />
                )}
              </Box>
            </Box>
            <Typography sx={{ mt: 0.5 }}>Введите Описание товара:</Typography>
            <TextField
              variant="standard"
              name="decription"
              type="text"
              onChange={handleChangeForm}
              sx={{ ml: 1 }}
              multiline
              label="Описание:"
            />
            <Typography sx={{ mt: 0.5 }}>
              Введите колличество товара:
            </Typography>
            <TextField
              variant="standard"
              name="number"
              type="number"
              defaultValue={formEquip.number}
              InputLabelProps={{ shrink: true }}
              onChange={handleChangeForm}
              sx={{ ml: 1 }}
              label="Колличество:"
            />
            <Button
              variant="contained"
              onClick={handleSaveEquip}
              sx={{
                mt: 1,
                maxWidth: 450,
                display: "flex",
                alignSelf: "center",
              }}
            >
              Сохранить
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEquipModal;
