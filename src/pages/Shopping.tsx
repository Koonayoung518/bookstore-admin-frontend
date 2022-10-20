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
import ShoppingNavBar from "../components/shopping/ShoppingNavBar";
import NoticeCard from "../components/NoticeCard";
const ShoppingPage = () => {
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

  const bringData = useCallback(async () => {
    const resBook = await new Api().getData("http://localhost:8080/book", {
      page: currentPage - 1,
    });

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
    setBookList(bookList.concat(_bookList));

    //서점 정보
    const resInfo = await new Api().getData(
      "http://localhost:8080/bookStoreInfo",
      {}
    );
    const _inputInfo = {
      operatingTime: resInfo.data.operatingTime,
      location: resInfo.data.location,
      phone: resInfo.data.phone,
      notice: resInfo.data.notice,
    };
    console.log("info ::", _inputInfo);
    setInfo(_inputInfo);
  }, [currentPage]);

  useEffect(() => {
    bringData();
  }, [currentPage]);

  return (
    <>
      <ShoppingNavBar></ShoppingNavBar>
      <NoticeCard info={info}></NoticeCard>
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
    </>
  );
};

export default ShoppingPage;
