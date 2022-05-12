import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
  ComposedChart,
} from "recharts";
import axios from "axios";

const Statistic = () => {
  const [eName, seteName] = useState(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [itemArr, setItemArr] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const graphic1 = useRef(null);

  const handleChangeItem = async (event) => {
    seteName(event.target.value);
    await axios
      .post("/api/stat/getSoldForYear", {
        eName: event.target.value,
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      });
  };
  const handleChangeCategory = async (event) => {
    setCategory(event.target.value);
    await axios
      .post("/api/stat/GetCategoryStat", {
        category: event.target.value,
      })
      .then((res) => {
        console.log(res.data.data);
        setData2(res.data.data);
      });
  };

  const handleGetCategory = useCallback(async () => {
    await axios.get("/api/item/getAllCategory").then((res) => {
      setCategoryList(res.data.category);
    });
  }, []);
  const handleGetAllItems = useCallback(async () => {
    await axios.get("/api/item/getItems").then((res) => {
      setItemArr(res.data.items);
    });
  }, []);

  useEffect(() => {
    handleGetCategory();
    handleGetAllItems();
  }, [handleGetAllItems, handleGetCategory]);
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box>
          <Typography align="center">
            График прибыли с конкретного товара
          </Typography>
          <Fragment>
            <LineChart
              width={850}
              height={250}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Прибыль"
                stroke="#8884d8"
              />
            </LineChart>
          </Fragment>
          <FormControl variant="standard" sx={{ m: 1, maxWidth: 300 }}>
            <InputLabel>Наименование:</InputLabel>
            <Select
              value={eName}
              name="category"
              onChange={handleChangeItem}
              label="Категория:"
              autoWidth
              sx={{ minWidth: 250 }}
            >
              {itemArr.length !== 0 &&
                itemArr.map((item) => (
                  <MenuItem value={item.name}>
                    <em>{item.name}</em>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box>
        <Typography align="center">
          График прибыли с конкретной категории
        </Typography>
        <Fragment>
          <ComposedChart
            width={1900}
            height={400}
            data={data2}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="allSold"
              name="всего продано на сумму"
              barSize={10}
              fill="#413ea0"
            />
            <Line
              type="monotone"
              dataKey="middleSold"
              name="Среднее арифметическое"
              stroke="#8884d8"
            />
          </ComposedChart>
        </Fragment>
        <FormControl variant="standard" sx={{ m: 1, maxWidth: 300 }}>
          <InputLabel>Категория:</InputLabel>
          <Select
            value={category}
            name="category"
            onChange={handleChangeCategory}
            label="Категория:"
            autoWidth
            sx={{ minWidth: 250 }}
          >
            {categoryList.length !== 0 &&
              categoryList.map((item) => (
                <MenuItem value={item.value}>
                  <em>{item.value}</em>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Statistic;
