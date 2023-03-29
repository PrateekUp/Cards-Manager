import React from "react";
import Logo from "../assets/logo.png";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { selectToggler, toggleDrawer } from "../features/toggleSlice.js";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

const handleClick = (isShown, dispatch) => {
  dispatch(toggleDrawer(!isShown));
};

const NavBar = () => {
  const isShown = useSelector(selectToggler);
  const dispatch = useDispatch();
  return (
    <AppBar
      sx={{
        position: "relative",
        backgroundColor: "rgb(134, 112, 112)",
        height: "10vh",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => handleClick(isShown, dispatch)}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <Box sx={{ p: "0.5rem" }}>
            <img
              src={Logo}
              style={{ height: "2.5rem", width: "2.5rem" }}
              alt="logo"
            />
          </Box>
        </Link>
        <Toolbar
          sx={{
            px: "1rem",
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Link
            to="/history"
            style={{
              color: "inherit",
              padding: "0.5rem",
              textDecoration: "none",
            }}
          >
            <h3>History</h3>
          </Link>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
