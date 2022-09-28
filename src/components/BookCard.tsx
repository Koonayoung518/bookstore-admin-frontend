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
          {product.price}원
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
  );
};

export default BookCard;
