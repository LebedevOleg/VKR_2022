import React, { useState } from "react";
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

const NavBar = () => {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

          <SignModal />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
