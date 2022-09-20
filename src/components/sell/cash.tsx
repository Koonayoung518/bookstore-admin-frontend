import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { green, pink } from "@mui/material/colors";
const Cash = (props: any) => {
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Avatar
              sx={{
                height: 56,
                width: 56,
                bgcolor: pink[500],
              }}
            >
              <AttachMoneyIcon fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography color="textPrimary" variant="h4">
              현금 결제
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Cash;
