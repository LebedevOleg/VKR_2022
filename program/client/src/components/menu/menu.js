import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { Badge, Button } from "@mui/material";
import SignModal from "../SignModal/sign.modal";
import { useAuth } from "../../hooks/auth.hook";
import { AuthContext } from "../../context/authContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

const NavBar = () => {
  const { token } = useAuth();
  const [openProf, setOpenProf] = useState(null);
  const open = Boolean(openProf);
  const auth = useContext(AuthContext);
  const [uRole, setURole] = useState(null);
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
      case "service":
        window.location = "/service";
        break;
      case "accaunt":
        window.location = "/profile";
        break;
      default:
        setOpenProf(null);
        break;
    }
  };
  const handleGetRole = useCallback(async () => {
    await axios
      .get("/api/user/getRole", {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(async (res) => {
        setURole(res.data.uRole);
      });
  }, []);

  useEffect(() => {
    handleGetRole();
  }, [handleGetRole]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  window.location = "/main";
                }}
              >
                ?????????????? ????????????????
              </Button>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  window.location = "/shop";
                }}
              >
                ????????????????????????
              </Button>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignContent: "flex-end", ml: "auto" }}>
            <IconButton
              aria-label="shopping cart"
              sx={{}}
              onClick={() => {
                window.location = "/shoplist";
              }}
            >
              <Fragment>
                <ShoppingCartIcon />
              </Fragment>
            </IconButton>
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
                  ??????????????
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
                    ?????? ??????????????
                  </MenuItem>
                  {uRole !== 3 && (
                    <MenuItem id="service" onClick={handleClose}>
                      ?????????????????? ????????
                    </MenuItem>
                  )}

                  <MenuItem id="logout" onClick={handleClose}>
                    ??????????
                  </MenuItem>
                </Menu>
              </Typography>
            )) || <SignModal />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
