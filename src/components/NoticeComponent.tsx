import { useCallback, useState, useEffect } from "react";
import {
  Stack,
  Alert,
  createTheme,
  AlertTitle,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import Notice from "./shopping/notice";
import OperationTime from "./shopping/operationTime";
import Location from "./shopping/location";
import Phone from "./shopping/phone";
import "../font/font.css";
const NoticeComponent = ({ info }: any) => {
  const theme = createTheme({
    typography: {
      fontFamily: "NanumSquareNeo-extraBold",
      fontSize: 20,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xl={12} lg={6} sm={6} xs={12}>
            <Notice sx={{ height: "100%" }} props={info.notice} />
          </Grid>
          {/* <Grid item lg={6} sm={6} xl={3} xs={12}>
            <Notice sx={{ height: "100%" }} props={info.notice} />
          </Grid> */}
          <Grid item lg={6} sm={6} xl={4} xs={12}>
            <OperationTime sx={{ height: "100%" }} props={info.operatingTime} />
          </Grid>
          <Grid item lg={6} sm={6} xl={4} xs={12}>
            <Location sx={{ height: "100%" }} props={info.location} />
          </Grid>
          <Grid item lg={6} sm={6} xl={4} xs={12}>
            <Phone sx={{ height: "100%" }} props={info.phone} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default NoticeComponent;
