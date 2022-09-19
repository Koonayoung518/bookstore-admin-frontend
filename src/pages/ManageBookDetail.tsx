import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Api from "../api/Api";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
const ManageBookDetailPage = (props: any) => {
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

  const onDelete = () => {
    deleteData();
  };

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
  }, []);

  useEffect(() => {
    bringData();
  }, [bringData]);

  const registerd = book.bookType === "registered";

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
                    <img alt="이미지 없음" src={book.image} />

                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {book.title}
                    </Typography>
                    <Typography color="red" variant="h6">
                      {book.bookType}
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
                          fullWidth
                          label="가격"
                          name="가격"
                          // onChange={handleChange}
                          required
                          type="number"
                          value={book.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="재고"
                          name="재고"
                          //onChange={handleChange}
                          required
                          value={book.stock}
                          variant="outlined"
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
                    >
                      Delete
                    </Button>
                    <Button color="primary" variant="contained">
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
