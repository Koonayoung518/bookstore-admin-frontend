import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Container,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Collapse,
  IconButton,
  Alert,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Api from "../api/Api";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
const ManageBookDetailPage = (props: any) => {
  const navigate = useNavigate();
  const params = useParams();
  const api = "http://localhost:8080/manage/book/" + params.isbn;
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    publisher: "",
    author: "",
    price: 0,
    pubdate: "",
    stock: 0,
    image: "",
    bookType: "",
  });

  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const onDelete = () => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (confirm === true) {
      deleteData();
      navigate("/manage/book");
    }
  };

  const onUpdate = () => {
    const confirm = window.confirm("수정하시겠습니까?");
    if (confirm === true) {
      postData();
      navigate("/manage/book/" + params.isbn);
    }
  };

  const postData = useCallback(async () => {
    const result = await new Api().postData(
      "http://localhost:8080/manage/update/book",
      {
        isbn: book.isbn,
        price: price,
        stock: stock,
      }
    );
  }, [book, price, stock]);

  const deleteData = useCallback(async () => {
    const response = await new Api().deleteData(
      `http://localhost:8080/manage/book/${book.isbn}`
    );
  }, [book]);
  const bringData = useCallback(async () => {
    const resBook = await new Api().getData(api, {});
    const _inputBook = {
      isbn: resBook.list.isbn,
      title: resBook.list.title,
      publisher: resBook.list.publisher,
      author: resBook.list.author,
      price: resBook.list.price,
      pubdate: resBook.list.pubdate,
      stock: resBook.list.stock,
      image: resBook.list.image,
      bookType: resBook.list.bookType,
    };
    setBook(_inputBook);
    setPrice(resBook.list.price);
    setStock(resBook.list.stock);
  }, []); //book이 변경될 때 함수 재생성

  const onSetPrice = useCallback((e: any) => {
    setPrice(e.target.value);
  }, []);

  const onSetStock = useCallback((e: any) => {
    setStock(e.target.value);
  }, []);

  useEffect(() => {
    bringData();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            책 정보
          </Typography>

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

                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {book.title}
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
                          inputProps={{ readOnly: true }}
                          value={book.isbn}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="출판사"
                          name="출판사"
                          inputProps={{ readOnly: true }}
                          value={book.publisher}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="저자"
                          name="저자"
                          inputProps={{ readOnly: true }}
                          value={book.author}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="출간일"
                          name="출간일"
                          inputProps={{ readOnly: true }}
                          value={book.pubdate}
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
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onDelete}
                      sx={{ mr: 2 }}
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onUpdate}
                    >
                      Update
                    </Button>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ManageBookDetailPage;
