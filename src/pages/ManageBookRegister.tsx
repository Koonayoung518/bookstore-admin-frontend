import { useCallback, useState, useEffect } from "react";

import {
  Box,
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  CardMedia,
  SvgIcon,
  CardActions,
  Divider,
  Grid,
  TextField,
  createTheme,
  Typography,
  ThemeProvider,
} from "@mui/material";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NavBar from "../components/NavBar";
const ManageBookRegisterPage = (props: any) => {
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
  const navigate = useNavigate();

  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    publisher: "",
    author: "",
    price: 0,
    pubdate: "",
    stock: 0,
    image: "",
    booktype: "",
  });
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const onSetIsbn = useCallback((e: any) => {
    setIsbn(e.target.value);
  }, []);

  const onSetPrice = useCallback((e: any) => {
    setPrice(e.target.value);
  }, []);

  const onSetStock = useCallback((e: any) => {
    setStock(e.target.value);
  }, []);

  const onSearch = () => {
    bringData();
  };
  const onRegister = () => {
    const confirm = window.confirm("등록하시겠습니까?");
    if (confirm === true) {
      postData();
      navigate("/manage/book");
    }
  };
  useEffect(() => {}, [book]);
  const bringData = useCallback(async () => {
    const resBook = await new Api().getData(
      `http://localhost:8080/admin/manage/book/${isbn}`,
      {}
    );
    const _inputBook = {
      isbn: resBook.data.isbn,
      title: resBook.data.title,
      publisher: resBook.data.publisher,
      author: resBook.data.author,
      price: resBook.data.price,
      pubdate: resBook.data.pubdate,
      stock: resBook.data.stock,
      image: resBook.data.image,
      booktype: resBook.data.bookType,
    };
    setPrice(resBook.data.price);
    setStock(resBook.data.stock);
    setBook(_inputBook);
  }, [book, isbn]);

  const postData = useCallback(async () => {
    const result = await new Api().postData(
      "http://localhost:8080/admin/manage/book",
      {
        isbn: book.isbn,
        title: book.title,
        publisher: book.publisher,
        author: book.author,
        price: price,
        pubdate: book.pubdate,
        stock: stock,
        image: book.image,
        booktype: book.booktype,
      }
    );
  }, [book, price, stock]);
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
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              책 등록
            </Typography>
            <Box sx={{ mt: 3, mb: 3 }}>
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
                      placeholder="Register book"
                      variant="outlined"
                      onChange={onSetIsbn}
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
            {book.booktype === "Registered" ? (
              <Typography variant="h6" sx={{ color: "#594545" }}>
                이미 등록된 책입니다.
              </Typography>
            ) : (
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <Card {...book}>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="250"
                          image={book.image}
                          alt="이미지 없음"
                        />
                        <Typography
                          color="textPrimary"
                          gutterBottom
                          variant="h5"
                        >
                          {book.title || ""}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#594545" }}>
                          {book.booktype || ""}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button fullWidth variant="contained">
                        책 표지 등록
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                  <form autoComplete="off">
                    <Card>
                      <CardHeader
                        subheader="The book information"
                        title="책 상세 정보"
                      />
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="ISBN"
                              name="ISBN"
                              disabled
                              id="outlined-disabled"
                              value={book.isbn || ""}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="출판사"
                              name="출판사"
                              disabled
                              id="outlined-disabled"
                              value={book.publisher || ""}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="저자"
                              name="저자"
                              disabled
                              id="outlined-disabled"
                              value={book.author || ""}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="출간일"
                              name="출간일"
                              disabled
                              id="outlined-disabled"
                              value={book.pubdate || ""}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              id="outlined-number"
                              fullWidth
                              label="가격"
                              name="가격"
                              onChange={onSetPrice}
                              required
                              type="number"
                              value={price}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              id="outlined-number"
                              label="재고"
                              type="number"
                              onChange={onSetStock}
                              fullWidth
                              required
                              value={stock}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            ></TextField>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          p: 2,
                        }}
                      >
                        <Button variant="contained" onClick={onRegister}>
                          등록
                        </Button>
                      </Box>
                    </Card>
                  </form>
                </Grid>
              </Grid>
            )}
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ManageBookRegisterPage;
