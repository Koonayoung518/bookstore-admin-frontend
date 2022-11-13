import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const Notice = ({ props }: any) => {
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              공지사항
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {props}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "#00A8CC",
                height: 56,
                width: 56,
              }}
            >
              <ErrorOutlineIcon fontSize="medium" />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Notice;
