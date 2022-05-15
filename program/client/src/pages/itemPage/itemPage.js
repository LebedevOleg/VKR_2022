import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
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
import toast, { Toaster } from "react-hot-toast";

const ItemPage = () => {
  const [item, setItem] = useState(null);
  const [options, setOptions] = useState(null);
  const [disable, setDisable] = useState(false);
  const params = useParams();
  const [images, setImage] = useState([null]);
  const [visImage, setVisImage] = useState("");

  const handleGetItem = useCallback(async () => {
    await axios
      .post("/api/item/getItem", { id: Number(params.id.split(":")[1]) })
      .then((res) => {
        setItem(res.data.item);
      });
  }, []);
  const handleGetImage = useCallback(async () => {
    await axios
      .post("/api/item/getImage", {
        id: Number(params.id.split(":")[1]),
      })
      .then((res) => {
        if (res.data.status === "ok") {
          setImage(res.data.image);
          setVisImage(res.data.image[0].fileName);
        }
      });
  }, []);
  const handleGetOptions = useCallback(async () => {
    await axios
      .post("/api/item/getOptions", { id: Number(params.id.split(":")[1]) })
      .then((res) => {
        setOptions(res.data.options);
      });
  }, []);

  const handleSaveItem = async () => {
    const cartArray = [];
    if (localStorage.getItem("cart")) {
      cartArray.push(localStorage.getItem("cart"));
      if (
        cartArray[0]
          .split(",")
          .includes(Number(params.id.split(":")[1].toString()))
      ) {
        let tempArr = [];
        tempArr = cartArray[0].split(",");
        tempArr.push(Number(params.id.split(":")[1].toString()));
        await axios
          .post("/api/item/findFreeItem", { ids: tempArr })
          .then((res) => {
            if (res.data.nextID !== 0) {
              cartArray.push(res.data.nextID[0][1]);
              localStorage.setItem("cart", cartArray);
              toast.success("Товар добавлен в карзину", {
                position: "bottom-left",
              });
            } else {
              setDisable(true);
              toast.error("Данный товар закончился!", {
                position: "bottom-left",
              });
            }
          });
      } else {
        cartArray.push(Number(params.id.split(":")[1]));
        localStorage.setItem("cart", cartArray);
        toast.success("Товар добавлен в карзину", {
          position: "bottom-left",
        });
      }
    } else {
      cartArray.push(Number(params.id.split(":")[1]));
      localStorage.setItem("cart", cartArray);
      toast.success("Товар добавлен в карзину", {
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    handleGetImage();
    handleGetItem();
    handleGetOptions();
  }, [handleGetItem, handleGetOptions, handleGetImage]);

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
      <div>
        <Toaster />
      </div>
      <Card sx={{ display: "flex" }}>
        <CardMedia>
          {visImage !== "" && images[0] !== null && (
            <img
              src={"http://localhost:5000/" + visImage}
              style={{ width: 250 }}
            />
          )}
          <Pagination
            count={images.length}
            defaultPage={1}
            onChange={(event, value) => {
              setVisImage(images[value - 1].fileName);
            }}
          />
        </CardMedia>
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
                          ((option.oValueIntB === 0 &&
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
          <Button disabled={disable} onClick={handleSaveItem}>
            В корзину
          </Button>
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
