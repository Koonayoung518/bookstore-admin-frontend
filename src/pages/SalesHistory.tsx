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
  Table,
  TableBody,
  TableCell,
  Checkbox,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import NavBar from "../components/NavBar";
const bookList = [
  {
    id: "1",
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    media: "/static/images/products/product_1.png",
    title: "Dropbox",
    totalDownloads: "594",
  },
  {
    id: "2",
    createdAt: "31/03/2019",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    media: "/static/images/products/product_2.png",
    title: "Medium Corporation",
    totalDownloads: "625",
  },
  {
    id: "3",
    createdAt: "03/04/2019",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    media: "/static/images/products/product_3.png",
    title: "Slack",
    totalDownloads: "857",
  },
  {
    id: "4",
    createdAt: "04/04/2019",
    description:
      "Lyft is an on-demand transportation company based in San Francisco, California.",
    media: "/static/images/products/product_4.png",
    title: "Lyft",
    totalDownloads: "406",
  },
  {
    id: "5",
    createdAt: "04/04/2019",
    description:
      "GitHub is a web-based hosting service for version control of code using Git.",
    media: "/static/images/products/product_5.png",
    title: "GitHub",
    totalDownloads: "835",
  },
  {
    id: "6",
    createdAt: "04/04/2019",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    media: "/static/images/products/product_6.png",
    title: "Squarespace",
    totalDownloads: "835",
  },
];

const SalesHistoryPage = () => {
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
            <Box sx={{ m: 1 }}>
              <Button sx={{ mr: 1 }}>Import</Button>
              <Button sx={{ mr: 1 }}>Export</Button>
              <Button color="primary" variant="contained">
                Add products
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

          <Grid item lg={8} md={6} xs={12}>
            <Grid>
              {" "}
              <Box sx={{ mt: 3 }}>
                <Container maxWidth={false}>
                  <PerfectScrollbar>
                    <Box sx={{ minWidth: 600 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell>판매번호</TableCell>
                            <TableCell>날짜</TableCell>
                            <TableCell>금액</TableCell>
                            <TableCell>상세보기</TableCell>
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
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {book.createdAt}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{book.createdAt}</TableCell>
                              <TableCell>{book.createdAt}</TableCell>
                              <TableCell>
                                <Button color="primary" variant="contained">
                                  상세 보기
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </PerfectScrollbar>
                </Container>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}></Grid>
          </Grid>
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
    </>
  );
};

export default SalesHistoryPage;
