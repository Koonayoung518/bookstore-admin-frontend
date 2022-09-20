import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
const CreditCard = (props: any) => {
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <CreditCardIcon fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h4">
              카드 결제
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreditCard;
