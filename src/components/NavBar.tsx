import { useCallback, useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Button,
  Toolbar,
  Avatar,
  Menu,
  IconButton,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import "../font/font.css";
const NavBar = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "NanumSquareNeo-extraBold",
      fontSize: 20,
    },
  });

  const navigate = useNavigate();
  const goSalesHistoryPage = () => {
    navigate("/sell/book/history");
  };
  const goSellBookPage = () => {
    navigate("/sell/book");
  };

  const goShoppingPage = () => {
    navigate("/bookStore");
  };

  const goSettingPage = () => {
    navigate("/setting");
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {};
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {};
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ bgcolor: "#041C32" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/manage/book"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BookStore
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              ></IconButton>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                letterSpacing: ".3rem",
                color: "#FFF8EA",
                textDecoration: "none",
              }}
            >
              BookStore
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{
                  my: 2,
                  mr: 2,

                  color: "white",
                  display: "block",
                  fontSize: 20,

                  fontFamily: "NanumSquareNeo-bold",
                }}
                onClick={goSellBookPage}
              >
                POS
              </Button>
              <Button
                sx={{
                  my: 2,
                  mr: 2,
                  color: "white",
                  display: "block",
                  fontSize: 20,
                  fontFamily: "NanumSquareNeo-bold",
                }}
                onClick={goSalesHistoryPage}
              >
                판매내역
              </Button>
              <Button
                sx={{
                  my: 2,
                  mr: 2,
                  color: "white",
                  display: "block",

                  fontSize: 20,
                  fontFamily: "NanumSquareNeo-bold",
                }}
                onClick={goShoppingPage}
              >
                웹사이트
              </Button>
              <Button
                sx={{
                  my: 2,
                  mr: 2,
                  color: "white",
                  display: "block",
                  fontSize: 20,
                  fontFamily: "NanumSquareNeo-bold",
                }}
                onClick={goSettingPage}
              >
                설정
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
