import {
  Box,
  Button,
  Container,
  CardContent,
  Card,
  Grid,
  Pagination,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  createTheme,
  ThemeProvider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Api from "../api/Api";
import NavBar from "../components/NavBar";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";
const SalesHistoryPage = () => {
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

  interface HistoryType {
    id: number;
    sellDate: string;
    totalPrice: number;
  }
  const [historyList, setHistoryList] = useState<HistoryType[]>([]);
  const [lastIdx, setLastIdx] = useState(0);
  const [type, setType] = useState("DATE");
  const onSetType = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };

  const bringData = useCallback(async () => {
    const resHistory = await new Api().getData(
      "http://localhost:8080/admin/history",
      {}
    );

    const _historyList = await resHistory.data.content.map(
      (historyData: any) => (
        setLastIdx(lastIdx + 1),
        {
          id: historyData.id,
          sellDate: historyData.sellDate,
          totalPrice: historyData.totalPrice,
        }
      )
    );
    console.log(resHistory);
    setHistoryList(historyList.concat(_historyList));
  }, []);

  useEffect(() => {
    bringData();
  }, []);

  console.log("book data ::", historyList);

  const [firstDay, setFirstDay] = useState<Dayjs | null>(null);
  const [lastDay, setlastDay] = useState<Dayjs | null>(null);

  // const mile = Date.parse(firstDay);
  // const date = new Date(firstDay);

  console.log("first" + firstDay?.format() + " last" + lastDay);
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
                판매내역
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
                    <FormControl sx={{ width: "30ch", ml: 3 }}>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={onSetType}
                        defaultValue="Date"
                      >
                        <MenuItem value="DATE">날짜</MenuItem>
                        <MenuItem value="PRICE">금액</MenuItem>
                        {/* <MenuItem value="All">날짜+금액</MenuItem> */}
                      </Select>
                    </FormControl>
                    {type === "DATE" ? (
                      <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="시작일"
                            value={firstDay}
                            inputFormat={"YYYY-MM-DD"}
                            maxDate={new Date()}
                            onChange={(newValue: any) => {
                              setFirstDay(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="종료일"
                            value={lastDay}
                            inputFormat={"YYYY-MM-DD"}
                            minDate={firstDay}
                            onChange={(newValue: any) => {
                              setlastDay(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </>
                    ) : (
                      <TextField
                        sx={{ width: "30ch", ml: 3 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon
                                color="action"
                                fontSize="small"
                              ></SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="금액"
                        variant="outlined"
                      />
                    )}
                    <Button variant="contained" sx={{ ml: 2 }}>
                      <SearchIcon fontSize="large"></SearchIcon>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Grid item lg={8} md={6} xs={12}>
              <Grid>
                {" "}
                <Box sx={{ mt: 3 }}>
                  <Container maxWidth={false}>
                    <PerfectScrollbar>
                      <Box sx={{ minWidth: 600 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>판매번호</TableCell>
                              <TableCell>날짜</TableCell>
                              <TableCell>금액</TableCell>
                              <TableCell>상세보기</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {historyList.map((history: any) => (
                              <TableRow>
                                <TableCell>
                                  <Box
                                    sx={{
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {history.id}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>{history.sellDate}</TableCell>
                                <TableCell>{history.totalPrice}</TableCell>
                                <TableCell>
                                  <Button color="primary" variant="contained">
                                    상세 보기
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                  </Container>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}></Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            >
              <Pagination color="primary" count={3} size="small" />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SalesHistoryPage;
