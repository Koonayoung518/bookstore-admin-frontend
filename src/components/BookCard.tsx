import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
const BookCard = ({ product, ...rest }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="book image"
        src={product.image}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          m: 3,
          minWidth: { md: 500 },
        }}
      >
        <Box component="span" sx={{ fontSize: 20, mt: 1 }}>
          {product.title}
        </Box>
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          {product.publisher}
        </Box>
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          {product.author}
        </Box>
        <Box component="span" sx={{ color: "primary.main", fontSize: 20 }}>
          {product.price}
        </Box>
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          재고 : {product.stock}권
        </Box>
        <Box
          sx={{
            mt: 1.5,
            p: 0.5,
            borderRadius: "5px",
            color: "primary.main",
            fontWeight: "medium",
            display: "flex",
            fontSize: 12,
            alignItems: "center",
            "& svg": {
              fontSize: 21,
              mr: 0.5,
            },
          }}
        ></Box>
      </Box>
    </Box>

    // <Card
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     height: "100%",
    //   }}
    //   {...rest}
    // >
    //   <Box>
    //     <CardMedia
    //       component="img"
    //       sx={{ width: 151 }}
    //       image={product.image}
    //       alt="book image"
    //     />
    //   </Box>
    //   <CardContent sx={{ flex: "1 0 auto" }}>
    //     <Typography
    //       align="center"
    //       color="textPrimary"
    //       gutterBottom
    //       variant="h5"
    //     >
    //       {product.title}
    //     </Typography>
    //     <Typography align="center" color="textPrimary" variant="body1">
    //       {product.publisher}
    //     </Typography>
    //     <Typography align="center" color="textPrimary" variant="body1">
    //       {product.author}
    //     </Typography>
    //     <Typography align="center" color="textPrimary" variant="body1">
    //       {product.price}
    //     </Typography>
    //     <Typography align="center" color="textPrimary" variant="body1">
    //       {product.stock}
    //     </Typography>
    //   </CardContent>
    //   <Box sx={{ flexGrow: 1 }} />
    //   <Divider />
    //   <Box sx={{ p: 2 }}>
    //     <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
    //       <Grid
    //         item
    //         sx={{
    //           alignItems: "center",
    //           display: "flex",
    //         }}
    //       >
    //         <Typography
    //           color="textSecondary"
    //           display="inline"
    //           sx={{ pl: 1 }}
    //           variant="body2"
    //         >
    //           Updated 2hr ago
    //         </Typography>
    //       </Grid>
    //       <Grid
    //         item
    //         sx={{
    //           alignItems: "center",
    //           display: "flex",
    //         }}
    //       >
    //         <Typography
    //           color="textSecondary"
    //           display="inline"
    //           sx={{ pl: 1 }}
    //           variant="body2"
    //         >
    //           {product.totalDownloads} Downloads
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </Card>
  );
};

export default BookCard;
