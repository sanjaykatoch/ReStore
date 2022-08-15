import { LoadingButton } from "@material-ui/lab";
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
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../../app/api/agent";
import { useStoreContext } from "../../../app/Context/StoreContext";
import { Product } from "../../../app/model/Product";
import { currenceyFormat } from "../../../app/util/util";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  //State
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);

  //function
  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId, 1)
      .then((basket) => {
        setBasket(basket);
        //gives undefined
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

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
            {currenceyFormat(product.price)}
            {/* $ {(product.price / 100).toFixed(2)} */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            onClick={() => handleAddItem(product.id)}
            size="small"
          >
            Add to Cart
          </LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">
            View
          </Button>
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
