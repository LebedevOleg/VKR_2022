import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import DatePicker from "react-datepicker";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import ChangeEquipModal from "./changeEquip.modal";
import toast, { Toaster } from "react-hot-toast";

const DataInput = forwardRef(({ value }) => {
  return (
    <TextField
      sx={{ width: 290, textAlign: "center" }}
      size="small"
      className="example-custom-input"
      variant="standard"
      value={value}
      disabled
    />
  );
});

const AllEquip = () => {
  const [equipment, setEquipment] = useState(null);
  const [status, setStatus] = useState(null);

  const handleChangeStatus = async (event) => {
    await axios
      .post("/api/item/ChangeStatus", {
        status: event.target.value,
        id: event.target.name,
      })
      .then(async (res) => {
        if (res.data.message === "alert") {
          toast.error(
            "Статус изменен раньше чем закончился срок аренды товара",
            {
              position: "bottom-left",
            }
          );
        }
        await axios.get("/api/item/getAllItems").then((res) => {
          setEquipment(res.data.items);
        });
      });
  };

  const handleGetEquipment = useCallback(async () => {
    await axios.get("/api/item/getAllItems").then((res) => {
      setEquipment(res.data.items);
    });
  }, []);

  const [openMap, setOpenMap] = useState(null);
  const map = Boolean(openMap);
  const handleOpenMap = (event) => {
    setOpenMap(event.currentTarget);
  };
  const handleCloseMap = () => {
    setOpenMap(null);
  };

  useEffect(() => {
    handleGetEquipment();
  }, [handleGetEquipment]);
  return (
    <TableContainer>
      <div>
        <Toaster />
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Номер</TableCell>
            <TableCell align="center">Наименование</TableCell>
            <TableCell align="center">Адрес нахождения</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="center">
              Даты последнего изменения статуса
            </TableCell>
          </TableRow>
        </TableHead>
        {equipment !== null &&
          equipment.map((eq) => (
            <TableBody key={eq.id}>
              <TableCell align="center">{eq.id}</TableCell>
              <TableCell align="center">{eq.eName}</TableCell>
              <TableCell
                aria-owns={map ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handleOpenMap}
                onMouseLeave={handleCloseMap}
                align="center"
              >
                <YMaps>
                  <Map
                    defaultState={{
                      center: [eq.pIat, eq.pIon],
                      zoom: 16,
                    }}
                  >
                    <Placemark defaultGeometry={[eq.pIat, eq.pIon]} />
                  </Map>
                </YMaps>
              </TableCell>
              <TableCell align="center">
                <Fragment key={eq.id}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id={equipment.indexOf(eq).toString()}
                      name={eq.id}
                      value={
                        (eq.pId !== 0 && eq.pId !== null && 1) ||
                        (eq.pId === null && null) ||
                        eq.pId
                      }
                      onChange={handleChangeStatus}
                      label="Age"
                    >
                      <MenuItem
                        value={0}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        На складе <HomeIcon />
                      </MenuItem>
                      <MenuItem
                        value={null}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <em>
                          В перевозке <TransferWithinAStationIcon />
                        </em>
                      </MenuItem>
                      <MenuItem
                        value={1}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        На площадке <WorkHistoryIcon />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Fragment>
              </TableCell>
              <TableCell align="center">
                <DatePicker
                  selected={new Date(eq.date_change)}
                  selectsStart
                  showTimeSelect
                  timeFormat="HH:mm"
                  disabled
                  dateFormat="dd-MM-yyyy HH:mm"
                  customInput={<DataInput />}
                />
              </TableCell>
              <TableCell>
                <ChangeEquipModal id={eq.id} />
              </TableCell>
            </TableBody>
          ))}
      </Table>
    </TableContainer>
  );
};

export default AllEquip;
