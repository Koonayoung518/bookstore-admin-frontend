import {
  Box,
  Button,
  Container,
  CardContent,
  Card,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import Api from "../api/Api";
import NavBar from "../components/NavBar";

const SettingPage = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "NanumSquareNeo-bold",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background: "#9E7676",
          },
        },
      },
    },
  });

  const [operatingTime, setOperatingTime] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [notice, setNotice] = useState("");

  const onSetOperatingTime = useCallback((e: any) => {
    setOperatingTime(e.target.value);
  }, []);

  const onSetPhone = useCallback((e: any) => {
    setPhone(e.target.value);
  }, []);

  const onSetLocation = useCallback((e: any) => {
    setLocation(e.target.value);
  }, []);

  const onSetNotice = useCallback((e: any) => {
    setNotice(e.target.value);
  }, []);

  const bringData = useCallback(async () => {
    const resInfo = await new Api().getData(
      "http://localhost:8080/bookStoreInfo",
      {}
    );
    setOperatingTime(resInfo.data.operatingTime);
    setPhone(resInfo.data.phone);
    setLocation(resInfo.data.location);
    setNotice(resInfo.data.notice);
    console.log(resInfo);
  }, []);

  const onRegister = () => {
    const confirm = window.confirm("등록하시겠습니까?");
    if (confirm === true) {
      postData();
    }
  };

  const postData = useCallback(async () => {
    const result = await new Api().postData(
      "http://localhost:8080/admin/bookStoreInfo",
      {
        operatingTime: operatingTime,
        phone: phone,
        location: location,
        notice: notice,
      }
    );
  }, [operatingTime, phone, location, notice]);

  const onDelete = () => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (confirm === true) {
      deleteData();
    }
  };
  const deleteData = useCallback(async () => {
    const response = await new Api().deleteData(
      "http://localhost:8080/admin/bookStoreInfo"
    );
  }, []);

  useEffect(() => {
    bringData();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                설정
              </Typography>
              <Box sx={{ m: 1 }}>
                <Button sx={{ mr: 1 }}>Import</Button>
                <Button sx={{ mr: 1 }}>Export</Button>
                <Button color="primary" variant="contained">
                  Add products
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box>
                    <TextField
                      sx={{ width: "40ch", ml: 3 }}
                      fullWidth
                      label="운영시간"
                      name="운영시간"
                      onChange={onSetOperatingTime}
                      value={operatingTime}
                      variant="outlined"
                    />
                    <TextField
                      sx={{ width: "40ch", ml: 3 }}
                      fullWidth
                      label="전화번호"
                      name="전화번호"
                      onChange={onSetPhone}
                      value={phone}
                      variant="outlined"
                    />

                    <TextField
                      sx={{ width: "40ch", ml: 3 }}
                      fullWidth
                      label="위치"
                      name="위치"
                      onChange={onSetLocation}
                      value={location}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={6}
                      sx={{ width: "70ch", ml: 3 }}
                      fullWidth
                      label="공지사항"
                      name="공지사항"
                      onChange={onSetNotice}
                      value={notice}
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      sx={{ ml: 2 }}
                      onClick={onRegister}
                    >
                      등록
                    </Button>

                    <Button
                      variant="contained"
                      sx={{ ml: 2 }}
                      onClick={onDelete}
                    >
                      삭제
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SettingPage;
