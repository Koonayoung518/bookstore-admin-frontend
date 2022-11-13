import { useCallback, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Button,
  TextField,
  TableHead,
  TableRow,
  Table,
  Typography,
  TableBody,
  TableCell,
  InputAdornment,
  Card,
  CardContent,
  CardHeader,
  SvgIcon,
} from "@mui/material";
import Api from "../api/Api";
import NavBar from "../components/NavBar";
import TotalPrice from "../components/sell/totalPrice";
import Change from "../components/sell/change";
import CreditCard from "../components/sell/creditCard";
import Cash from "../components/sell/cash";
import SearchIcon from "@mui/icons-material/Search";

import MoneyIcon from "@mui/icons-material/Money";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PerfectScrollbar from "react-perfect-scrollbar";

const SellBookPage = () => {
  interface BookType {
    isbn: string;
    title: string;
    unitPrice: number;
    amount: number;
    total: number;
  }
  const [bookList, setBookList] = useState<BookType[]>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [received, setReceived] = useState(0);
  const [change, setChange] = useState(0);
  var _change: number = 0;
  const onSetReceived = useCallback((e: any) => {
    setReceived(e.target.value);
  }, []);

  const onSetChange = useCallback(() => {
    if (received < totalPrice) window.alert("받은 금액이 적습니다.");
    else {
      setChange(received - totalPrice);
      _change = received - totalPrice;
      onRegister("CASH");
    }
  }, [received, totalPrice]);
  const onRegister = (p: string) => {
    postData(p);
  };
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") onSearch();
  };
  const onCard = useCallback(() => {
    onRegister("CARD");
  }, [bookList, totalPrice]);
  const [isbn, setIsbn] = useState("");

  const onSetIsbn = useCallback((e: any) => {
    setIsbn(e.target.value);
  }, []);

  const onSearch = () => {
    bringData();
    setIsbn("");
  };

  const bringData = useCallback(async () => {
    var newbook = true;
    const resBook = await new Api().getData(
      `http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/admin/sell/book/${isbn}`,
      {}
    );

    bookList.map((book) =>
      book.isbn === resBook.data.isbn ? (newbook = false) : (newbook = true)
    );
    if (newbook) {
      const _inputBook: BookType = {
        isbn: resBook.data.isbn,
        title: resBook.data.title,
        unitPrice: resBook.data.unitPrice,
        amount: 1,
        total: resBook.data.unitPrice,
      };

      setBookList(bookList.concat(_inputBook));
      setTotalPrice(totalPrice + resBook.data.unitPrice);
    } else {
      setBookList(
        bookList.map((book) =>
          book.isbn === isbn
            ? {
                ...book,
                amount: book.amount + 1,
                total: book.total + book.unitPrice,
              }
            : book
        )
      );

      setTotalPrice(totalPrice + resBook.data.unitPrice);
    }
  }, [bookList, isbn]);

  const postData = useCallback(
    async (p: string) => {
      const result = await new Api().postData(
        "http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/admin/sell/book",
        {
          bookList,
          totalPrice: totalPrice,
          payment: p,
          money: received,
          change: _change,
        }
      );

      console.log({
        bookList,
        totalPrice: totalPrice,
        payment: p,
        money: received,
        change: _change,
      });
    },
    [bookList, totalPrice, received, change]
  );

  const onPlusAmount = useCallback(
    (isbn: any) => {
      setBookList(
        bookList.map((book) =>
          book.isbn === isbn
            ? {
                ...book,
                amount: book.amount + 1,
                total: book.total + book.unitPrice,
              }
            : book
        )
      );
    },
    [bookList]
  );

  const onMinusAmount = useCallback(
    (isbn: any) => {
      setBookList(
        bookList.map((book) =>
          book.isbn === isbn
            ? {
                ...book,
                amount: book.amount - 1,
                total: book.total - book.unitPrice,
              }
            : book
        )
      );
    },
    [bookList]
  );

  const onSetTotalPrice = useCallback(() => {
    var totalPrice = 0;
    bookList.map((book) => (totalPrice += book.total));
    setTotalPrice(totalPrice);
  }, [bookList]);

  useEffect(() => {
    onSetTotalPrice();
  }, [bookList, change, isbn]);
  return (
    <>
      <NavBar></NavBar>

      <Container maxWidth={false} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xl={6} lg={6} sm={6} xs={12}>
            <TotalPrice sx={{ height: "100%" }} props={totalPrice} />
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Change sx={{ height: "100%" }} props={change} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader title="내역" />
              <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ISBN</TableCell>
                        <TableCell>책 제목</TableCell>
                        <TableCell>가격</TableCell>
                        <TableCell>수량</TableCell>
                        <TableCell>총 금액</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookList.map((book: any) => (
                        <TableRow hover key={book.isbn}>
                          <TableCell>{book.isbn}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.unitPrice}</TableCell>

                          <TableCell>
                            <Button
                              color="primary"
                              size="small"
                              variant="text"
                              onClick={() => onMinusAmount(book.isbn)}
                            >
                              <RemoveIcon />
                            </Button>

                            {book.amount}
                            <Button
                              color="secondary"
                              size="small"
                              variant="text"
                              onClick={() => onPlusAmount(book.isbn)}
                            >
                              <AddIcon />
                            </Button>
                          </TableCell>
                          <TableCell>{book.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              ></Box>
            </Card>
          </Grid>
          <Grid item xl={6} lg={3} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={3}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="overline"
                    >
                      받은 금액
                    </Typography>

                    <Typography color="textPrimary" variant="h4">
                      <TextField
                        id="outlined-number"
                        sx={{
                          height: 100,
                          width: 300,
                          fontSize: 34,
                        }}
                        onChange={onSetReceived}
                        required
                        type="number"
                      ></TextField>
                      원
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        backgroundColor: "primary.main",
                        height: 56,
                        width: 56,
                      }}
                    >
                      <MoneyIcon fontSize="large" />
                    </Avatar>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Cash onClick={onSetChange} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CreditCard onClick={onCard} />
          </Grid>
        </Grid>
      </Container>

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
          value={isbn}
          onChange={onSetIsbn}
          onKeyPress={handleOnKeyPress}
        />
      </Box>
    </>
  );
};

export default SellBookPage;
