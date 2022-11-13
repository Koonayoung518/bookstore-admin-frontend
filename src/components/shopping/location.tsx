import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { green, pink } from "@mui/material/colors";
const Location = ({ props }: any) => {
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              위치
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {props}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                height: 56,
                width: 56,
                bgcolor: "#E23E57",
              }}
            >
              <LocationOnIcon fontSize="medium" />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Location;
