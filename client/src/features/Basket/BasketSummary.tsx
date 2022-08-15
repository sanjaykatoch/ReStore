import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useStoreContext } from "../../app/Context/StoreContext";
import { BasketItem } from "../../app/model/Basket";
import { currenceyFormat } from "../../app/util/util";

const BasketSummary = () => {
  const { basket } = useStoreContext();
  const subTotal =
    basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;
  const deliveryFee = subTotal > 10000 ? 0 : 500;
  //   const [objAmount, setObjAmount] = useState({
  //     subtotal: 0,
  //     deliveryFee: 0,
  //     total: 0,
  //   });
  //   setObjAmount({
  //     subtotal: basket?.items.reduce((sum, item) => sum + item.quantity, 0),
  //     deliveryFee: 0,
  //     total: 0,
  //   });

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{currenceyFormat(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">
                {currenceyFormat(deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {currenceyFormat(subTotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasketSummary;
