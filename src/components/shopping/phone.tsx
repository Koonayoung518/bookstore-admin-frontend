import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
const Phone = ({ props }: any) => {
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              연락처
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {props}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "#27496D",
                height: 56,
                width: 56,
              }}
            >
              <PhoneIphoneIcon fontSize="medium" />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Phone;
