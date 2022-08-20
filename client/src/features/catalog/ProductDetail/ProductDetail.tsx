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
// import { useStoreContext } from "../../../app/Context/StoreContext";
import NotFound from "../../../app/errors/notFound";
import { Product } from "../../../app/model/Product";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/Store/ConfigureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
  setBasket,
} from "../../Basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "../CatalogSlice";

const ProductDetail = () => {
  // const { basket, setBasket, removeItem } = useStoreContext();
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((x: any) => x.productId == product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, item, dispatch, product]);

  function handledInputChnge(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function hanldeUpdateCart() {
    let q = item?.quantity ?? 0;
    if (!item || quantity > q) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: item?.productId,
          quantity: updatedQuantity,
        })
      );
    } else {
      if (item.quantity != quantity) {
        const updatedQuantity = item.quantity - quantity;
        dispatch(
          removeBasketItemAsync({
            productId: item?.productId,
            quantity: updatedQuantity,
          })
        );
      }
    }
  }
  if (productStatus.includes("pending")) return <h3>Loading..</h3>;
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
              loading={status.includes("pending")}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={() => hanldeUpdateCart()}
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
