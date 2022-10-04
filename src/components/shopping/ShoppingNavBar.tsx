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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";

const ShoppingNavBar = () => {
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
    <AppBar position="static" sx={{ bgcolor: "#E79A6C" }}>
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
              POS
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={goSalesHistoryPage}
            >
              판매내역
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={goShoppingPage}
            >
              웹사이트
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
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
  );
};

export default ShoppingNavBar;
