import { useCallback, useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

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
} from "@mui/material";
import Api from "../api/Api";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const ManagePage = (props: any) => {
  const navigate = useNavigate();
  const goRegisterPage = () => {
    navigate("/manage/book/register");
  };
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
    <>
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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={goRegisterPage}
                >
                  책 등록
                </Button>
              </Box>
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
                            <SvgIcon color="action" fontSize="small"></SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Search book"
                      variant="outlined"
                    />
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
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell>ISBN</TableCell>
                        <TableCell>책 제목</TableCell>
                        <TableCell>출판사</TableCell>
                        <TableCell>수량</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookList.map((book: any) => (
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
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
                          <TableCell>
                            <Link to={`/manage/book/${book.isbn}`}>
                              {book.title}
                            </Link>
                          </TableCell>
                          <TableCell>{book.publisher}</TableCell>
                          <TableCell>{book.stock}</TableCell>
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
    </>
  );
};

export default ManagePage;
