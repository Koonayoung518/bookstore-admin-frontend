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
                  교내 서점 사이트 프로젝트
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
                        API 명세서
                      </Typography>
                      <Box>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={goAPIDocsPage}
                          sx={{ ml: 2, fontSize: 25 }}
                        >
                          <LibraryBooksIcon fontSize="large"></LibraryBooksIcon>
                          API 명세서
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
                              서점 운영자를 위한 서점 운영 페이지<br></br>- 서적
                              등록, 수정, 삭제 등 서적 재고 관리가 가능하다{" "}
                              <br></br>- 판매내역을 조회할 수 있다<br></br>-
                              간편한 POS기 기능을 제공한다
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
                            서점 운영 페이지
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
                              서점 이용자(학생)를 위한 서점 페이지<br></br>-
                              서점 내 서적 재고 확인이 가능하다<br></br>- 서점
                              운영 시간, 위치 등 서점 상세 정보 확인이 가능하다
                              <br></br>- 서적 검색이 가능하다<br></br>
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
                            서점 페이지
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
