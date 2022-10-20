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
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";

const ShoppingNavBar = () => {
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
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {};
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {};
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ bgcolor: "#815B5B" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/manage/book"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
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
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BookStore
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={goSellBookPage}
              >
                마이페이지
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

export default ShoppingNavBar;
