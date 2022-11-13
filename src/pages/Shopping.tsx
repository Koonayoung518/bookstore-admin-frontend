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
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import Api from "../api/Api";
import BookCard from "../components/BookCard";
import ShoppingNavBar from "../components/shopping/ShoppingNavBar";
import NoticeCard from "../components/NoticeCard";
import NoticeComponent from "../components/NoticeComponent";
import SearchIcon from "@mui/icons-material/Search";
const ShoppingPage = () => {
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

  const [lastIdx, setLastIdx] = useState(0);
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

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  const [totalPage, setTotalPage] = useState(1);

  const [info, setInfo] = useState({
    operatingTime: "",
    location: "",
    phone: "",
    notice: "",
  });

  const [search, setSearch] = useState("");

  const searchData = useCallback(async () => {
    const resBook = await new Api().getData(
      "http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/book/title/" +
        search,
      { page: 0 }
    );

    const _bookList = await resBook.data.content.map(
      (bookData: any) => (
        setLastIdx(lastIdx + 1),
        {
          isbn: bookData.isbn,
          title: bookData.title,
          publisher: bookData.publisher,
          author: bookData.author,
          image: bookData.image,
          price: bookData.price,
          stock: bookData.stock,
        }
      )
    );
    console.log(resBook);
    setBookList(_bookList);
    setTotalPage(resBook.data.totalPages);
  }, [search, currentPage]);

  const onSearch = () => {
    searchData();
  };
  const onSetSearch = useCallback((e: any) => {
    setSearch(e.target.value);
  }, []);

  const bringData = useCallback(async () => {
    const resBook = await new Api().getData(
      "http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/book",
      {
        page: currentPage - 1,
      }
    );

    const _bookList = await resBook.data.content.map(
      (bookData: any) => (
        setLastIdx(lastIdx + 1),
        {
          isbn: bookData.isbn,
          title: bookData.title,
          publisher: bookData.publisher,
          author: bookData.author,
          image: bookData.image,
          price: bookData.price,
          stock: bookData.stock,
        }
      )
    );
    setTotalPage(resBook.data.totalPages);

    console.log(resBook);
    setBookList(_bookList);
  }, [currentPage]);

  const bringInfoData = useCallback(async () => {
    const resInfo = await new Api().getData(
      "http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/bookStoreInfo",
      {}
    );
    const _inputInfo = {
      operatingTime: resInfo.data.operatingTime,
      location: resInfo.data.location,
      phone: resInfo.data.phone,
      notice: resInfo.data.notice,
    };
    setInfo(_inputInfo);
  }, []);

  useEffect(() => {
    bringData();
    bringInfoData();
  }, [currentPage]);

  return (
    <>
      <ShoppingNavBar></ShoppingNavBar>
      <ThemeProvider theme={theme}>
        <NoticeComponent info={info}></NoticeComponent>
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
            ></Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box>
                    <TextField
                      sx={{ width: "50ch" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small"></SvgIcon>
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
            <Box sx={{ pt: 3, mt: 3, pl: 10 }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {bookList.map((book) => (
                  <Grid item key={book.isbn} xs={6}>
                    <BookCard product={book} />
                  </Grid>
                ))}
              </Grid>
            </Box>
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

export default ShoppingPage;
