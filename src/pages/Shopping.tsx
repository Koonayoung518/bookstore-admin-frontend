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
  Typography,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import Api from "../api/Api";
import BookCard from "../components/BookCard";

const ShoppingPage = () => {
  const [bookList, setBookList] = useState([
    {
      isbn: "",
      title: "",
      publisher: "",
      author: "",
      price: 0,
      pubdate: "",
      stock: 0,
      image: "",
    },
  ]);
  const [lastIdx, setLastIdx] = useState(0);
  const bringData = useCallback(async () => {
    const resBook = await new Api().getData(
      "http://localhost:8080/manage/book",
      {}
    );

    const _bookList = await resBook.list.map(
      (bookData: any) => (
        setLastIdx(lastIdx + 1),
        {
          isbn: bookData.isbn,
          title: bookData.title,
          publisher: bookData.publisher,
          author: bookData.author,
          price: bookData.price,
          pubdate: bookData.pubdate,
          stock: bookData.stock,
          image: bookData.image,
        }
      )
    );
    console.log(resBook);
    setBookList(bookList.concat(_bookList));
  }, []);

  useEffect(() => {
    bringData();
  }, []);
  console.log("book data ::", bookList);

  return (
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
            Books
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action"></SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search product"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={5}>
            {bookList.map((book) => (
              <Grid item key={book.isbn} lg={8} md={6} xs={12}>
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
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Box>
  );
};

export default ShoppingPage;
