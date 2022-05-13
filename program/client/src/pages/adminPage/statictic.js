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
import toast, { Toaster } from "react-hot-toast";

const Statistic = () => {
  const [eName, seteName] = useState(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [years, setYears] = useState([]);
  const [month, setMonth] = useState([]);
  const [itemArr, setItemArr] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [formSort, setFormSort] = useState({
    eName: null,
    years: 2022,
    mounth: new Date().toLocaleString("default", {
      month: "long",
    }),
  });
  const graphic1 = useRef(null);

  const handleChangeItem = async (event) => {
    setFormSort({ ...formSort, [event.target.name]: event.target.value });
    if (formSort.eName === null && event.target.name !== "eName") {
      toast.error("Необходимо выбрать товар, который просматриваем", {
        position: "bottom-left",
      });
    } else if (event.target.name === "eName") {
      await axios
        .post("/api/stat/getSoldForYear", {
          eName: event.target.value,
          year: formSort.years,
          month: formSort.mounth,
        })
        .then((res) => {
          setData(res.data.data);
          setData3(res.data.month);
        });
    } else if (event.target.name === "years") {
      await axios
        .post("/api/stat/getSoldForYear", {
          eName: formSort.eName,
          year: event.target.value,
        })
        .then((res) => {
          setData(res.data.data);
        });
    } else if (event.target.name === "mounth") {
      await axios
        .post("/api/stat/getSoldForYear", {
          eName: formSort.eName,
          year: formSort.years,
          month: event.target.value,
        })
        .then((res) => {
          setData(res.data.data);
          setData3(res.data.month);
        });
    }
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

  const handleGetMonth = useCallback(async () => {
    await axios.get("/api/stat/getMonth").then((res) => {
      setMonth(res.data.month);
    });
  }, []);
  const handleGetYear = useCallback(async () => {
    await axios.get("/api/stat/getYears").then((res) => {
      setYears(res.data.years);
    });
  }, []);
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
    handleGetMonth();
    handleGetYear();
    handleGetCategory();
    handleGetAllItems();
  }, [handleGetAllItems, handleGetCategory, handleGetYear, handleGetMonth]);
  return (
    <Box>
      <div>
        <Toaster />
      </div>
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
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
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
              value={formSort.eName}
              name="eName"
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
          <FormControl variant="standard" sx={{ m: 1, maxWidth: 300 }}>
            <InputLabel>Год:</InputLabel>
            <Select
              value={formSort.years}
              name="years"
              onChange={handleChangeItem}
              label="Год:"
              autoWidth
              sx={{ minWidth: 250 }}
            >
              {years.length !== 0 &&
                years.map((item) => (
                  <MenuItem value={item}>
                    <em>{item}</em>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography align="center">
            График прибыли с конкретного товара по дням
          </Typography>
          <Fragment>
            <LineChart
              width={850}
              height={250}
              data={data3}
              margin={{ top: 5, left: 10, bottom: 5 }}
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
          <FormControl variant="standard" sx={{ ml: 20, maxWidth: 300 }}>
            <InputLabel>Месяц:</InputLabel>
            <Select
              value={formSort.mounth}
              name="mounth"
              onChange={handleChangeItem}
              label="Месяц:"
              autoWidth
              sx={{ minWidth: 250 }}
            >
              {month.length !== 0 &&
                month.map((item) => (
                  <MenuItem value={item}>
                    <em>{item}</em>
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
