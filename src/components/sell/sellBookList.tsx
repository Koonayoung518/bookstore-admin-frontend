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

const SellBookList = ({ props }: any) => {
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
              {props.map((book: any) => (
                <TableRow hover key={book.isbn}>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.price}</TableCell>

                  <TableCell>
                    <Button color="primary" size="small" variant="text">
                      <RemoveIcon />
                    </Button>
                    1
                    <Button color="secondary" size="small" variant="text">
                      <AddIcon />
                    </Button>
                  </TableCell>
                  <TableCell>상태</TableCell>
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
