import {
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
} from "@mui/material";
import { Product } from "../../app/model/Product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: {
              fontWeight: "bold",
              color: "primary.main",
            },
          }}
        />

        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.main",
          }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            color="secondary"
            variant="h5"
            component="div"
          >
            $ {(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to Cart</Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>

      {/* <ListItem key={product.name}>
        <ListItemAvatar>
          <Avatar src={product.pictureUrl} />
        </ListItemAvatar>
        <ListItemText>
          {product.name} - {product.price}
        </ListItemText>
      </ListItem> */}
    </>
  );
}
