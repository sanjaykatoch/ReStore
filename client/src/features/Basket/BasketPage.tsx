// import { Button } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import {
  Add,
  Delete,
  Remove,
  SignalWifiStatusbarConnectedNoInternet4,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/Context/StoreContext";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/model/Basket";
import { currenceyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/Store/ConfigureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
  setBasket,
} from "./BasketSlice";

const BasketPage = () => {
  // const { basket, setBasket, removeItem } = useStoreContext();
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (basket == null || basket.items.length == 0)
    return <Typography variant="h3">Your Basket is Empty</Typography>;
  // if (loading) return <LoadingComponent message="Loading Basket" />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item: any) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currenceyFormat(item.price)}
                  {/* {(item.price / 100).toFixed(2)} */}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId + "remove"
                    )}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "remove",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status.includes("pendingAddItem" + item.productId)}
                    onClick={
                      () =>
                        dispatch(
                          addBasketItemAsync({ productId: item.productId })
                        )

                      //handledAddItem(item.productId, "add" + item.productId)
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId + "del"
                    )}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />

          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
        <Grid></Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
