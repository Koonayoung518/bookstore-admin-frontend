import { useCallback, useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import {
  Avatar,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputAdornment,
  SvgIcon,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Api from "../api/Api";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { isBindingName } from "typescript";
import "../font/font.css";
import Search from "@mui/icons-material/Search";
import SearchIcon from "@mui/icons-material/Search";
const ManagePage = (props: any) => {
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
  const goRegisterPage = () => {
    navigate("/manage/book/register");
  };
  const goDetailPage = (isbn: any) => {
    navigate("/manage/book/" + isbn);
  };

  interface BookType {
    isbn: string;
    title: string;
    publisher: string;
    author: string;
    price: number;
    pubdate: string;
    stock: number;
    image: string;
  }
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [lastIdx, setLastIdx] = useState(0);
  const [search, setSearch] = useState("");

  const searchData = useCallback(async () => {
    const resBook = await new Api().getData(
      "http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/admin/manage/book/title",
      { title: search }
    );

    const _bookList = await resBook.data.map((bookData: any) => ({
      isbn: bookData.isbn,
      title: bookData.title,
      publisher: bookData.publisher,
      image: bookData.image,
      stock: bookData.stock,
    }));
    console.log(resBook);
    setBookList(_bookList);
  }, [search]);

  const onSetSearch = useCallback((e: any) => {
    setSearch(e.target.value);
  }, []);

  const bringData = useCallback(async () => {
    const resBook = await new Api().getData(
      "http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/admin/manage/book",
      {}
    );

    const _bookList = await resBook.data.map(
      (bookData: any) => (
        setLastIdx(lastIdx + 1),
        {
          isbn: bookData.isbn,
          title: bookData.title,
          publisher: bookData.publisher,
          image: bookData.image,
          stock: bookData.stock,
        }
      )
    );
    console.log(resBook);
    setBookList(bookList.concat(_bookList));
  }, []);

  const onSearch = () => {
    searchData();
  };

  useEffect(() => {
    bringData();
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Box {...props}>
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
                  책 관리
                </Typography>
                <Box sx={{ m: 1 }}>
                  <Button variant="contained" onClick={goRegisterPage}>
                    책 등록
                  </Button>
                </Box>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardContent>
                    <Box>
                      <TextField
                        sx={{ width: "50ch" }}
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
                        placeholder="책 제목을 입력하세요."
                        variant="outlined"
                        onChange={onSetSearch}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={onSearch}
                        sx={{ ml: 2 }}
                      >
                        <SearchIcon fontSize="large"></SearchIcon>
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Container maxWidth={false}>
                <PerfectScrollbar>
                  <Box sx={{ minWidth: 1050 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ISBN</TableCell>
                          <TableCell>책 제목</TableCell>
                          <TableCell>출판사</TableCell>
                          <TableCell>수량</TableCell>
                          <TableCell>상세 정보</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bookList.map((book: any) => (
                          <TableRow key={book.isbn}>
                            <TableCell>
                              <Box
                                sx={{
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Avatar
                                  src={book.image}
                                  variant="square"
                                ></Avatar>
                                <Typography color="textPrimary" variant="body1">
                                  {book.isbn}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.stock}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                onClick={() => goDetailPage(book.isbn)}
                              >
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
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ManagePage;
