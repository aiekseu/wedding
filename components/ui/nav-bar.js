import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { LANDING_SECTIONS } from "../../utils/consts";
import { useEffect, useState } from "react";
import usePageRedirect from "../../utils/use-page-redirect";
import Image from "next/image";

const NavBar = ({ handleOpenSignIn }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleScroll = (section) => {
    if (section.ref)
      section.ref.current.scrollIntoView({
        behavior: "smooth",
      });
    else {
      setAnchorElNav(null);
    }
  };

  return (
    <AppBar position="sticky" sx={{ background: "transparent" }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* MOBILE */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize={"large"} sx={{ color: "#5A6000" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleScroll}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {LANDING_SECTIONS.map((section) => (
                <MenuItem
                  key={section.label}
                  onClick={() => handleScroll(section)}
                >
                  <Typography textAlign="center">{section.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LARGE SCREEN */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {LANDING_SECTIONS.map((section) => (
              <Button
                key={section.label}
                onClick={() => handleScroll(section)}
                sx={{ my: 2, mx: 2, display: "block" }}
              >
                {section.label}
              </Button>
            ))}
          </Box>

          {/* PROFILE */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Профиль">
              <IconButton
                size={"large"}
                onClick={handleOpenSignIn}
                sx={{ p: 0, border: ".5px solid #5A600030" }}
              >
                <Image
                  src={"/icons/shrek-face.png"}
                  height={48}
                  width={48}
                  style={{ overflow: "hidden", borderRadius: "100%" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
