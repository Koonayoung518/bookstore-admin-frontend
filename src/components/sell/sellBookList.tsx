import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  TableHead,
  TableRow,
  Table,
  Typography,
  TableBody,
  TableCell,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PerfectScrollbar from "react-perfect-scrollbar";

const orders = [
  {
    id: "123",
    ref: "9788965402602",
    amount: 3,
    customer: {
      name: "스프링 부트와 AWS로 혼자 구현하는 웹 서비스",
    },
    createdAt: 22000,
    status: 66000,
  },
  {
    id: "1234",
    ref: "9791185578606",
    amount: 1,
    customer: {
      name: "인공지능 (파이썬으로 배우는 머신러닝과 딥러닝)",
    },
    createdAt: 30000,
    status: 30000,
  },
];

const SellBookList = (props: any) => {
  return (
    <Card {...props}>
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
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.ref}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    <Button color="primary" size="small" variant="text">
                      <RemoveIcon />
                    </Button>
                    {order.amount}
                    <Button color="secondary" size="small" variant="text">
                      <AddIcon />
                    </Button>
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
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
  );
};

export default SellBookList;
