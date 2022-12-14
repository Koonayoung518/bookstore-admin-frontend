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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
const IntroPage = (props: any) => {
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
  const goBookStorePage = () => {
    navigate("/BookStore");
  };
  const goAPIDocsPage = (isbn: any) => {
    window.location.href =
      "http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/docs/index.html";
  };
  const goManagePage = () => {
    navigate("/manage/book");
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="md" fixed>
            <Box sx={{ minWidth: 275 }}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                <Typography sx={{ m: 1 }} variant="h3">
                  ?????? ?????? ????????? ????????????
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        mt: 5,
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        m: -1,
                      }}
                    >
                      <Typography sx={{ m: 1, fontSize: 25 }}>
                        API ?????????
                      </Typography>
                      <Box>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={goAPIDocsPage}
                          sx={{ ml: 2, fontSize: 25 }}
                        >
                          <LibraryBooksIcon fontSize="large"></LibraryBooksIcon>
                          API ?????????
                        </Button>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mt: 5,
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        m: -1,
                      }}
                    >
                      <Box sx={{ mt: 5 }}>
                        <Card
                          sx={{
                            bgcolor: "#041C32",
                            minWidth: 345,
                            minHeight: 300,
                          }}
                        >
                          <Box>
                            <Typography sx={{ m: 1, color: "#ffffff" }}>
                              ?????? ???????????? ?????? ?????? ?????? ?????????<br></br>- ??????
                              ??????, ??????, ?????? ??? ?????? ?????? ????????? ????????????{" "}
                              <br></br>- ??????????????? ????????? ??? ??????<br></br>-
                              ????????? POS??? ????????? ????????????
                            </Typography>
                          </Box>

                          <Button
                            color="primary"
                            variant="contained"
                            onClick={goManagePage}
                            sx={{
                              mt: 5,
                              ml: 8,
                              fontSize: 25,
                              border: "3px solid",
                              borderColor: "#ffffff",
                              background: "#ffffff",
                              color: "#041C32",
                            }}
                          >
                            <ManageAccountsIcon fontSize="large"></ManageAccountsIcon>
                            ?????? ?????? ?????????
                          </Button>
                        </Card>
                      </Box>
                      <Box sx={{ mt: 5 }}>
                        <Card
                          sx={{
                            bgcolor: "#041C32",
                            minWidth: 345,
                            minHeight: 300,
                          }}
                        >
                          <Box>
                            <Typography sx={{ m: 1, color: "#ffffff" }}>
                              ?????? ?????????(??????)??? ?????? ?????? ?????????<br></br>-
                              ?????? ??? ?????? ?????? ????????? ????????????<br></br>- ??????
                              ?????? ??????, ?????? ??? ?????? ?????? ?????? ????????? ????????????
                              <br></br>- ?????? ????????? ????????????<br></br>
                            </Typography>
                          </Box>

                          <Button
                            color="primary"
                            variant="contained"
                            onClick={goBookStorePage}
                            sx={{
                              mt: 5,
                              ml: 8,
                              fontSize: 25,
                              border: "3px solid",
                              borderColor: "#ffffff",
                              background: "#ffffff",
                              color: "#041C32",
                            }}
                          >
                            <AutoStoriesIcon fontSize="large"></AutoStoriesIcon>
                            ?????? ?????????
                          </Button>
                        </Card>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default IntroPage;
