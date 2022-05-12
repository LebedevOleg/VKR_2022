import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { forwardRef, Fragment, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const InputPhoto = styled("input")({ display: "none" });

const AddEquipModal = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [formEquip, setFormEquip] = useState({
    category: "",
    name: "",
    price: 0,
    description: null,
    priceForHour: 0,
    number: 1,
  });
  //#region stepperFunc
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const optionsMap = new Map();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const allStepsCompleted = () => {
    return completedSteps() === 2;
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormEquip({
      category: "",
      name: "",
      price: 0,
      description: null,
      priceForHour: 0,
      number: 1,
    });
    optionsMap.clear();
  };
  const handleNext = () => {
    let newActiveStep;
    if (activeStep != 1) {
      newActiveStep = activeStep + 1;
    } else {
      newActiveStep = 0;
    }
    setActiveStep(newActiveStep);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  //#endregion
  const [url, setUrl] = useState("");

  const handleSaveEquip = async () => {
    await axios.post("/api/item/addItem", {
      ...formEquip,
      options: [...optionsMap],
    });
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
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
    await axios
      .post("api/pars/downloadImage", {
        url: url,
        fileName: formEquip.name,
      })
      .then((res) => {
        toast.success("Фото успешно загружено, можете загрузить еще", {
          position: "bottom-left",
        });
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChangeOptions = (event) => {
    let tempStruct;
    if (optionsMap.has(event.target.name.split(":")[0])) {
      tempStruct = optionsMap.get(event.target.name.split(":")[0]);
    } else {
      tempStruct = {
        oName: null,
        oValueIntA: null,
        oValueIntB: null,
        oValueChar: null,
        oValueName: null,
      };
      tempStruct.oName = event.target.name.split(":")[0];
      tempStruct.oValueName = event.target.name.split(":")[1];
    }
    console.log(tempStruct);
    if (event.target.id === "oValueIntA") {
      tempStruct.oValueIntA = event.target.value;
    } else if (event.target.id === "oValueIntB") {
      tempStruct.oValueIntB = event.target.value;
    } else if (event.target.id === "oValueChar") {
      tempStruct.oValueChar = event.target.value;
    }
    /* setOptionsMap(
      (map) => new Map(map.set(event.target.name.split(":")[0], tempStruct))
    ); */
    optionsMap.set(event.target.name.split(":")[0], tempStruct);
    console.log(optionsMap);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
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
        <Stepper nonLinear activeStep={activeStep}>
          <Step completed={completed[0]}>
            <StepButton color="inherit" onClick={handleStep(0)}>
              Добавление основных параметров
            </StepButton>
          </Step>
          <Step completed={completed[1]}>
            <StepButton color="inherit" onClick={handleStep(1)}>
              Добавление характеристик
            </StepButton>
          </Step>
        </Stepper>
        <div>
          {(allStepsCompleted() && (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Товары добавлены в БД.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Добавить еще</Button>
                <Button onClick={handleClickClose}>Выйти</Button>
              </Box>
            </Fragment>
          )) ||
            (activeStep === 0 && (
              <Fragment>
                <DialogContent>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Box sx={{ width: 450 }}>
                        <Typography>Выберите категорию:</Typography>
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, maxWidth: 300 }}
                        >
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
                            <MenuItem value="Акустические системы пассивные">
                              <em>Акустические системы пассивные </em>
                            </MenuItem>
                            <MenuItem value="Стойки">
                              <em>Стойки</em>
                            </MenuItem>
                            <MenuItem value="Кабели">
                              <em>Кабели</em>
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
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
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
                    <Typography sx={{ mt: 0.5 }}>
                      Введите Описание товара:
                    </Typography>
                    <TextField
                      variant="standard"
                      name="description"
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
                      onClick={handleComplete}
                      sx={{
                        mt: 1,
                        maxWidth: 450,
                        display: "flex",
                        alignSelf: "center",
                      }}
                    >
                      Перейти к заполнению характеристик
                    </Button>
                  </Box>
                </DialogContent>
              </Fragment>
            )) ||
            (activeStep === 1 && formEquip.category === "" && (
              <Fragment>
                <Typography>Сначала нужно выбрать категорию товара</Typography>
              </Fragment>
            )) ||
            (formEquip.category === "Студийные мониторы" && (
              <Fragment>
                <Typography variant="h3" sx={{ mt: 2, ml: 3 }}>
                  Изменеие характеристик
                </Typography>
                <Stack
                  spacing={1}
                  divider={<Divider orientation="horizontal" />}
                  sx={{ ml: 1, mr: "15%" }}
                >
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Частотный диапозон:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Частотный диапозон:Гц"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите минимальное хначение"
                      />
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Частотный диапозон:Гц"
                        id="oValueIntB"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите максимальное значение"
                      />
                      Гц
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Выходная мощность:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Выходная мощность:Вт"
                        className="Вт"
                        id="oValueIntA"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите выходную мощность"
                      />
                      Вт
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Входы/Выходы:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Входы/Выходы:"
                        id="oValueChar"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Перечислите разъемы через запятую"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Габариты (Ширина/Высота/Глубина):
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Габариты (Ширина/Высота/Глубина):"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите габариты объекта"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Габариты в заводской упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Габариты в заводской упаковке:"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите габариты объекта в упаковке"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Вес без упаковки:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Вес без упаковки:Кг"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите вес объекта без упаковки"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Вес в упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Вес в упаковке:Кг"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите вес объекта с упаковкой"
                      />
                    </Typography>
                  </Box>
                </Stack>
                <Button sx={{ m: 1 }} onClick={handleSaveEquip}>
                  Сохранить товары
                </Button>
              </Fragment>
            )) ||
            (formEquip.category === "Акустические системы активные" && (
              <Fragment>
                <Typography variant="h3" sx={{ mt: 2, ml: 3 }}>
                  Изменеие характеристик
                </Typography>
                <Stack
                  spacing={1}
                  divider={<Divider orientation="horizontal" />}
                  sx={{ ml: 1, mr: "15%" }}
                >
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Частотный диапозон:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Частотный диапозон:Гц"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите минимальное хначение"
                      />
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Частотный диапозон:Гц"
                        id="oValueIntB"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите максимальное значение"
                      />
                      Гц
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Максимальная Выходная мощность:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Выходная мощность:Вт"
                        className="Вт"
                        id="oValueIntA"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите выходную мощность"
                      />
                      Вт
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Входы/Выходы:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Входы/Выходы:"
                        id="oValueChar"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Перечислите разъемы через запятую"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Габариты (Ширина/Высота/Глубина):
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Габариты (Ширина/Высота/Глубина):"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите габариты объекта"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Питание:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Питание:"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите требования к питанию"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Габариты в заводской упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Габариты в заводской упаковке:"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите габариты объекта в упаковке"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Вес без упаковки:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Вес без упаковки:Кг"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите вес объекта без упаковки"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Вес в упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Вес в упаковке:Кг"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите вес объекта с упаковкой"
                      />
                    </Typography>
                  </Box>
                </Stack>
                <Button sx={{ m: 1 }} onClick={handleSaveEquip}>
                  Сохранить товары
                </Button>
              </Fragment>
            )) ||
            (formEquip.category === "Акустические системы пассивные" && (
              <Fragment>
                <Typography variant="h3" sx={{ mt: 2, ml: 3 }}>
                  Изменеие характеристик
                </Typography>
                <Stack
                  spacing={1}
                  divider={<Divider orientation="horizontal" />}
                  sx={{ ml: 1, mr: "15%" }}
                >
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Частотный диапозон:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Частотный диапозон:Гц"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите минимальное хначение"
                      />
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Частотный диапозон:Гц"
                        id="oValueIntB"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите максимальное значение"
                      />
                      Гц
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Максимальная Выходная мощность:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Выходная мощность:Вт"
                        className="Вт"
                        id="oValueIntA"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите выходную мощность"
                      />
                      Вт
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ p: 1 }}>
                      Чувствительность:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Чувствительность:Db"
                        className="Db"
                        id="oValueIntA"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите выходную мощность"
                      />
                      Db
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ p: 1 }}>
                      Сопротивление:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Сопротивление:Ом"
                        className="Ом"
                        id="oValueIntA"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите выходную мощность"
                      />
                      Ом
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Входы/Выходы:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Входы/Выходы:"
                        id="oValueChar"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Перечислите разъемы через запятую"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Габариты (Ширина/Высота/Глубина):
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Габариты (Ширина/Высота/Глубина):"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите габариты объекта"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Габариты в заводской упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Габариты в заводской упаковке:"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите габариты объекта в упаковке"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Вес без упаковки:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Вес без упаковки:Кг"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите вес объекта без упаковки"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Вес в упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Вес в упаковке:Кг"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите вес объекта с упаковкой"
                      />
                    </Typography>
                  </Box>
                </Stack>
                <Button sx={{ m: 1 }} onClick={handleSaveEquip}>
                  Сохранить товары
                </Button>
              </Fragment>
            )) ||
            (formEquip.category === "Стойки" && (
              <Fragment>
                <Typography variant="h3" sx={{ mt: 2, ml: 3 }}>
                  Изменеие характеристик
                </Typography>
                <Stack
                  spacing={1}
                  divider={<Divider orientation="horizontal" />}
                  sx={{ ml: 1, mr: "15%" }}
                >
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Высота:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Высота:мм"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите минимальное хначение"
                      />
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Высота:мм"
                        id="oValueIntB"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите максимальное значение"
                      />
                      мм
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Максимальная нагрузка:
                      <TextField
                        sx={{
                          ml: 1,
                          width: "300px",
                          maxWidth: "400px",
                          minWidth: "150px",
                        }}
                        name="Выходная нагрузка:кг"
                        className="кг"
                        id="oValueIntA"
                        size="small"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите нагрузку"
                      />
                      кг
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Габариты в заводской упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Габариты в заводской упаковке:"
                        id="oValueChar"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите габариты объекта в упаковке"
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1.5, ml: 1, fontWeight: "light" }}>
                    <Typography sx={{ p: 1 }}>
                      Вес в упаковке:
                      <TextField
                        sx={{ ml: 1, width: "300px" }}
                        size="small"
                        name="Вес в упаковке:Кг"
                        id="oValueIntA"
                        onChange={handleChangeOptions}
                        variant="standard"
                        placeholder="Введите вес объекта с упаковкой"
                      />
                    </Typography>
                  </Box>
                </Stack>
                <Button sx={{ m: 1 }} onClick={handleSaveEquip}>
                  Сохранить товары
                </Button>
              </Fragment>
            ))}
        </div>
      </Dialog>
    </>
  );
};

export default AddEquipModal;

{
  /* <DialogContent>
<Box sx={{ display: "flex", flexDirection: "column" }}>
  <Box sx={{ display: "flex", flexDirection: "row" }}>
    <Box sx={{ width: 450 }}>
      <Typography>Выберите категорию:</Typography>
      <FormControl
        variant="standard"
        sx={{ m: 1, maxWidth: 300 }}
      >
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
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
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
  <Typography sx={{ mt: 0.5 }}>
    Введите Описание товара:
  </Typography>
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
</DialogContent> */
}
