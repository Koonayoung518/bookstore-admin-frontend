import { Avatar, Box } from "@mui/material";
const BookCard = ({ product, ...rest }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "auto",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
        height: 280,
      }}
    >
      <Box
        component="img"
        sx={{
          height: 260,
          width: 330,
          maxHeight: { xs: 260, md: 167 },
          maxWidth: { xs: 330, md: 250 },
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
          maxWidth: { md: 400 },
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
      </Box>
    </Box>
  );
};

export default BookCard;
