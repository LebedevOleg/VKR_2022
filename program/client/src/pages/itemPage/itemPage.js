import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddOptions from "./addOptions";

const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [options, setOptions] = useState(null);
  const params = useParams();

  const handleGetItem = useCallback(async () => {
    await axios
      .post("/api/item/getItem", { id: Number(params.id.split(":")[1]) })
      .then((res) => {
        setItem(res.data.item);
      });
  }, []);
  const handleGetOptions = useCallback(async () => {
    await axios
      .post("/api/item/getOptions", { id: Number(params.id.split(":")[1]) })
      .then((res) => {
        setOptions(res.data.options);
      });
  }, []);
  useEffect(() => {
    handleGetItem();
    handleGetOptions();
  }, [handleGetItem, handleGetOptions]);

  if (item === null) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ m: 2 }}
        width={"99%"}
        height={250}
      />
    );
  }
  return (
    <Box>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 250, m: 5 }}
          image="https://pop-music.ru/upload/resize_cache/iblock/dbe/417_378_1/dbe88b4c2123956db0af0c1821c22acb.jpg"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box
            sx={{
              ml: 30,
              mt: 3,
              alignItems: "flex-end",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography align="right" variant="h5">
              {item.eName}
            </Typography>
            <Typography variant="h6">характеристики</Typography>
            <TableContainer sx={{ width: 700 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Название характеристики</TableCell>
                    <TableCell>Параметр</TableCell>
                  </TableRow>
                </TableHead>

                {options !== undefined &&
                  options !== null &&
                  options.map((option) => (
                    <TableBody key={option.id}>
                      <TableCell>{option.oName}</TableCell>{" "}
                      <TableCell>
                        {(option.oValueChar === null &&
                          ((option.oValueIntB === null &&
                            option.oValueIntA.toString() +
                              " " +
                              option.oValueName) ||
                            option.oValueIntA.toString() +
                              " - " +
                              option.oValueIntB.toString() +
                              " " +
                              option.oValueName)) ||
                          option.oValueChar}
                      </TableCell>
                    </TableBody>
                  ))}
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
        <CardActions sx={{ alignItems: "end" }}>
          <Button>В корзину</Button>
        </CardActions>
      </Card>
      <Box>
        <Typography>{item.eDescription}</Typography>
      </Box>
      <AddOptions />
    </Box>
  );
};

export default ItemPage;
