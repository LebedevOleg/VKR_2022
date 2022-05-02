import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const AddOptions = () => {
  const [optionsForm, setOptionsForm] = useState([]);
  const [options, setOptions] = useState(null);
  const [category, setCategory] = useState(null);
  const params = useParams();
  const auth = useContext(AuthContext);
  const [uRole, setURole] = useState(null);

  const handleGetRole = useCallback(async () => {
    await axios
      .get("/api/user/getRole", {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(async (res) => {
        setURole(res.data.uRole);
      });
  }, []);
  const getCategory = useCallback(async () => {
    await axios
      .post("/api/item/getCategory", {
        id: Number(params.id.split(":")[1]),
      })
      .then((res) => {
        setCategory(res.data.category);
      });
  });
  const handleGetOptions = useCallback(async () => {
    await axios
      .post("/api/item/getOptionsSort", { id: Number(params.id.split(":")[1]) })
      .then((res) => {
        setOptions(res.data.options);
      });
  }, []);

  useEffect(() => {
    handleGetRole();
    getCategory();
    handleGetOptions();
  }, [handleGetRole, getCategory, handleGetOptions]);

  // return({uRole !== null && uRole !== undefined && uRole === 0 && category !== null && category !== undefined && category === "Студийные мониторы" && ()})
  if (uRole !== null && uRole !== undefined && uRole === 0) {
    if (category !== null && category !== undefined) {
      console.log(options);
      switch (category) {
        case "Студийные мониторы":
          return (
            <>
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
                      name="oValueIntA"
                      defaultValue={
                        (options !== undefined && options[6].oValueIntA) || ""
                      }
                      variant="standard"
                      placeholder="Введите минимальное хначение"
                    />
                    <TextField
                      sx={{ ml: 1, width: "300px" }}
                      size="small"
                      name="oValueIntA"
                      defaultValue={
                        (options !== undefined && options[6].oValueIntB) || ""
                      }
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
                      name="uLastName"
                      defaultValue={
                        (options !== undefined && options[3].oValueIntA) || ""
                      }
                      size="small"
                      variant="standard"
                      placeholder="Введите выходную мощность"
                    />
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
                      name="uLastName"
                      size="small"
                      defaultValue={
                        (options !== undefined && options[2].oValueChar) || ""
                      }
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
                      name="uEmail"
                      defaultValue={
                        (options !== undefined && options[4].oValueChar) || ""
                      }
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
                      name="uEmail"
                      variant="standard"
                      defaultValue={
                        (options !== undefined && options[5].oValueChar) || ""
                      }
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
                      name="uEmail"
                      variant="standard"
                      defaultValue={
                        (options !== undefined && options[0].oValueIntA) || ""
                      }
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
                      name="uEmail"
                      variant="standard"
                      defaultValue={
                        (options !== undefined && options[1].oValueIntA) || ""
                      }
                      placeholder="Введите вес объекта с упаковкой"
                    />
                  </Typography>
                </Box>
              </Stack>
              <Button sx={{ m: 1 }}>Сохранить изменения</Button>
            </>
          );
          break;
        default:
          return;
      }
    }
  }
};

export default AddOptions;
///"oName", "oValueIntA", "oValueIntB", "oValueChar", "eId", "oValueName"

/* {
    oName: null,
    oValueIntA: null,
    oValueIntB: null,
    oValueChar: null,
    eId: null,
    oValueName: null,
  } */
