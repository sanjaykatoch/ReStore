import { LoadingButton } from "@material-ui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../../app/api/agent";
import { useStoreContext } from "../../../app/Context/StoreContext";
import NotFound from "../../../app/errors/notFound";
import { Product } from "../../../app/model/Product";

const ProductDetail = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((x) => x.productId == product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    agent.Catalog.details(parseInt(id ?? ""))
      .then((response) => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handledInputChnge(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function UpdateUpdateCart() {
    setSubmitting(true);
    let q = item?.quantity ?? 0;
    if (!item || quantity > q) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updatedQuantity)
        .then((basket) => {
          setBasket(basket);
          toast.success("Cart is updated");
        })
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      if (item.quantity != quantity) {
        const updatedQuantity = item.quantity - quantity;
        agent.Basket.removeItem(product?.id!, updatedQuantity)
          .then((basket) => {
            removeItem(product?.id!, updatedQuantity);
            toast.success("Cart is updated");
          })
          .catch((error) => console.log(error))
          .finally(() => setSubmitting(false));
      } else {
        toast.info("Cart is already Update");
        setSubmitting(false);
      }
    }
  }
  if (loading) return <h3>Loading..</h3>;
  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{ mb: 2 }}></Divider>
        <Typography variant="h4">
          $ {((product?.price ? product?.price : 0) / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product?.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in Stocks</TableCell>
                <TableCell>{product?.quantity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={(e) => handledInputChnge(e)}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={submitting}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={() => UpdateUpdateCart()}
            >
              {item ? "Update Quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
