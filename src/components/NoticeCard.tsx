import { useCallback, useState, useEffect } from "react";
import { Stack, Alert, createTheme, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import "../font/font.css";
const NoticeCard = ({ info }: any) => {
  const theme = createTheme({
    typography: {
      fontFamily: "NanumSquareNeo-extraBold",
      fontSize: 20,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ maxWidth: 700, mt: 3, ml: 50 }} spacing={2}>
        <Alert variant="outlined" severity="info">
          <AlertTitle>공지</AlertTitle>
          {info.notice}
        </Alert>
        <Alert variant="outlined" severity="success">
          <AlertTitle>운영시간</AlertTitle>
          {info.operatingTime}
        </Alert>
        <Alert variant="outlined" severity="success">
          <AlertTitle>연락처</AlertTitle>
          {info.phone}
        </Alert>

        <Alert variant="outlined" severity="success">
          <AlertTitle>위치</AlertTitle>
          {info.location}
        </Alert>
      </Stack>
    </ThemeProvider>
  );
};

export default NoticeCard;
