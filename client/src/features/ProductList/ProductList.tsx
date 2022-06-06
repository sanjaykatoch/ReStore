import {
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import { Product } from "../../app/model/Product";
import ProductCard from "../ProductCard/ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
