import { useCallback, useState, useEffect } from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TotalPrice from "../components/sell/totalPrice";
import Change from "../components/sell/change";
import CreditCard from "../components/sell/creditCard";
import Cash from "../components/sell/cash";
import Money from "../components/sell/money";
import SellBookList from "../components/sell/sellBookList";

const SellBookPage = () => {
  const navigate = useNavigate();
  const goBookDetailPage = () => {
    navigate(`/manage/book`);
  };

  const [total, setTotal] = useState(0);
  const [received, setReceived] = useState(0);
  const [change, setChange] = useState(0);

  const onSetChange = useCallback((e: any) => {
    setChange(received - total);
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
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} sm={6} xs={12}>
              <TotalPrice sx={{ height: "100%" }} props={total} />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <Change props={change} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <SellBookList />
            </Grid>
            <Grid item xl={6} lg={3} sm={6} xs={12}>
              <Money sx={{ height: "100%" }} props={received} />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <Cash onClick={onSetChange} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <CreditCard onClick={goBookDetailPage} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SellBookPage;
