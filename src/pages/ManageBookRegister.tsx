import { useCallback, useState, useEffect } from "react";

import {
  Box,
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  SvgIcon,
  CardActions,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const ManageBookRegisterPage = (props: any) => {
  const navigate = useNavigate();
  const goBookDetailPage = () => {
    navigate(`/manage/book`);
  };
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

  const onSetIsbn = useCallback((e: any) => {
    setIsbn(e.target.value);
  }, []);

  const onSetPrice = useCallback((e: any) => {
    book.price = e.target.value;
  }, []);

  const onSetStock = useCallback((e: any) => {
    book.stock = e.target.value;
  }, []);

  const onSearch = () => {
    bringData();
  };
  const onRegister = () => {
    postData();
  };
  useEffect(() => {}, [book]);

  const bringData = useCallback(async () => {
    const resBook = await new Api().getData(
      `http://localhost:8080/manage/book/${isbn}`,
      {}
    );
    const _inputBook = {
      isbn: resBook.list.isbn,
      title: resBook.list.title,
      publisher: resBook.list.publisher,
      author: resBook.list.author,
      price: resBook.list.price,
      pubdate: resBook.list.pubdate,
      stock: resBook.list.stock,
      image: resBook.list.image,
      booktype: resBook.list.bookType,
    };
    setBook(_inputBook);
  }, [book, isbn]);

  const postData = useCallback(async () => {
    const result = await new Api().postData(
      "http://localhost:8080/manage/register/book",
      {
        isbn: book.isbn,
        title: book.title,
        publisher: book.publisher,
        author: book.author,
        price: book.price,
        pubdate: book.pubdate,
        stock: book.stock,
        image: book.image,
        booktype: book.booktype,
      }
    );
    console.log({
      isbn: book.isbn,
      title: book.title,
      publisher: book.publisher,
      author: book.author,
      price: book.price,
      pubdate: book.pubdate,
      stock: book.stock,
      image: book.image,
      booktype: book.booktype,
    });
  }, [book, book.price, book.stock]);
  return (
    <>
      <NavBar></NavBar>
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          책 등록
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
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
                <Button color="primary" variant="contained" onClick={onSearch}>
                  책 검색
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {book.booktype === "Registered" ? (
          <Typography color="red" variant="h6">
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
                    <img alt="이미지 없음" src={book.image} />

                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {book.title || ""}
                    </Typography>
                    <Typography color="red" variant="h6">
                      {book.booktype || ""}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" fullWidth variant="text">
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
                          defaultValue={book.price}
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
                          defaultValue={book.stock}
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
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onRegister}
                    >
                      등록
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ManageBookRegisterPage;
