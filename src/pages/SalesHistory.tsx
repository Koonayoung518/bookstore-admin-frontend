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
import { Link, useNavigate } from "react-router-dom";

const SalesHistoryPage = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "NanumSquareNeo-bold",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background: "#041C32",
          },
        },
      },
    },
  });
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const [totalPage, setTotalPage] = useState(1);

  const goDetailPage = (id: any) => {
    navigate("/sell/book/history/" + id);
  };

  interface HistoryType {
    id: number;
    sellDate: string;
    totalPrice: number;
  }
  const [firstDay, setFirstDay] = useState<Dayjs | null>(dayjs(new Date()));
  const [lastDay, setlastDay] = useState<Dayjs | null>(dayjs(new Date()));

  const [historyList, setHistoryList] = useState<HistoryType[]>([]);
  const [lastIdx, setLastIdx] = useState(0);
  const [type, setType] = useState("DEFAULT");

  const onSetType = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };
  const [price, setPrice] = useState(0);

  const onSetPrice = useCallback((e: any) => {
    setPrice(e.target.value);
  }, []);

  const onSearch = () => {
    setCurrentPage(1);
    bringDataByCondition();
  };
  const bringDataByCondition = useCallback(async () => {
    console.log("bringdatabycondition" + price);
    const resHistory = await new Api().getData(
      `http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/admin/history/type`,
      {
        type: type,
        price: price,
        startDate: firstDay?.format("YYYY-MM-DDTHH:mm:ss"),
        endDate: lastDay?.format("YYYY-MM-DDTHH:mm:ss"),
        page: currentPage - 1,
      }
    );
    setTotalPage(resHistory.data.totalPages);
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
    setHistoryList(_historyList);
    //[].concat() => []??? ???????????? ?????? ?????? ()?????? ????????????.
  }, [type, price, firstDay, lastDay, historyList, currentPage]);

  useEffect(() => {
    bringDataByCondition();
  }, [currentPage]);

  console.log("book data ::", historyList);

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
                ????????????
              </Typography>
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
                        defaultValue="DEFAULT"
                      >
                        <MenuItem value="DATE">??????</MenuItem>
                        <MenuItem value="PRICE">??????</MenuItem>
                        <MenuItem value="DEFAULT">??????</MenuItem>
                      </Select>
                    </FormControl>
                    {type === "DATE" ? (
                      <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="?????????"
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
                            label="?????????"
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
                        placeholder="??????"
                        variant="outlined"
                        onChange={onSetPrice}
                      />
                    )}
                    <Button
                      variant="contained"
                      sx={{ ml: 2 }}
                      onClick={onSearch}
                    >
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
                              <TableCell>????????????</TableCell>
                              <TableCell>??????</TableCell>
                              <TableCell>??????</TableCell>
                              <TableCell>????????????</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {historyList.map((history: any) => (
                              <TableRow key={history.id}>
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
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => goDetailPage(history.id)}
                                  >
                                    ?????? ??????
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
              <Pagination
                color="primary"
                defaultPage={1}
                page={currentPage}
                count={totalPage}
                onChange={onPageChange}
                size="small"
              />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SalesHistoryPage;
