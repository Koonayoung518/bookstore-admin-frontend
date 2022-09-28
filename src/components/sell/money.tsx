import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";
const Money = ({ props }: any) => {
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              받은 금액
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {props}원
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
  );
};

export default Money;
