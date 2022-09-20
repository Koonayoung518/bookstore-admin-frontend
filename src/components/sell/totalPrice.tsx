import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
const TotalPrice = (props: any) => {
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              총 금액
            </Typography>
            <Typography color="textPrimary" variant="h4">
              32,000원
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
              <PaidIcon fontSize="large" />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalPrice;
