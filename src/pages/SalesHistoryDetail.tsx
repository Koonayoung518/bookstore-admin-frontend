import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  CardContent,
  Card,
  Table,
  TableBody,
  TableCell,
  Paper,
  Checkbox,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import Api from "../api/Api";

import { useParams } from "react-router-dom";
const SalesHistoryDetailPage = (props: any) => {
  const params = useParams();
  const [history, setHistory] = useState({
    sellDate: "",
    totalPrice: 0,
    money: 0,
    change: 0,
    payment: "",
  });
  interface BookType {
    isbn: string;
    title: string;
    unitPrice: number;
    amount: number;
    total: string;
  }
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [lastIdx, setLastIdx] = useState(0);

  const bringData = useCallback(async () => {
    const resHistory = await new Api().getData(
      `http://ec2-43-200-118-169.ap-northeast-2.compute.amazonaws.com:8080/admin/history/${params.id}`,
      {}
    );
    const _inputHistory = {
      sellDate: resHistory.data.sellDate,
      totalPrice: resHistory.data.totalPrice,
      money: resHistory.data.money,
      change: resHistory.data.change,
      payment: resHistory.data.payment,
    };
    setHistory(_inputHistory);
    const _bookList = await resHistory.data.bookList.map(
      (bookData: any) => (
        setLastIdx(lastIdx + 1),
        {
          isbn: bookData.isbn,
          title: bookData.title,
          unitPrice: bookData.unitPrice,
          amount: bookData.amount,
          total: bookData.total,
        }
      )
    );
    console.log(resHistory);
    setBookList(bookList.concat(_bookList));
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
              판매내역
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 500 }}>
                  <Typography>판매일 : {history.sellDate}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    상세
                  </TableCell>
                  <TableCell align="right">금액</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ISBN</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">단가</TableCell>
                  <TableCell align="right">수량</TableCell>
                  <TableCell align="right">금액</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookList.map((book) => (
                  <TableRow key={book.isbn}>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell align="right">{book.title}</TableCell>
                    <TableCell align="right">{book.unitPrice}</TableCell>
                    <TableCell align="right">{book.amount}</TableCell>
                    <TableCell align="right">{book.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell>합계</TableCell>
                  <TableCell align="right">{history.totalPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>결제수단</TableCell>
                  <TableCell align="right">{history.payment}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>결제금액</TableCell>
                  <TableCell align="right">{history.money}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>거스름돈</TableCell>
                  <TableCell align="right">{history.change}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

export default SalesHistoryDetailPage;
