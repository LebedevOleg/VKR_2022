import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import SignModal from "../SignModal/sign.modal";
import { useAuth } from "../../hooks/auth.hook";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token } = useAuth();
  const [openProf, setOpenProf] = useState(null);
  const open = Boolean(openProf);
  const auth = useContext(AuthContext);
  const handleClick = (event) => {
    setOpenProf(event.currentTarget);
  };
  const handleClose = (event) => {
    switch (event.target.id) {
      case "logout":
        auth.logout();
        setOpenProf(null);
        window.location = "/main";
        break;
      default:
        setOpenProf(null);
        break;
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              {" "}
              Оборудование
            </Button>
          </Typography>
          {(!!token && (
            <Typography>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Профиль
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={openProf}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem id="accaunt" onClick={handleClose}>
                  Мой аккаунт
                </MenuItem>
                <MenuItem id="logout" onClick={handleClose}>
                  Выйти
                </MenuItem>
              </Menu>
            </Typography>
          )) || <SignModal />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
