import {
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import { Product } from "../../../app/model/Product";
import { useAppSelector } from "../../../app/Store/ConfigureStore";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productLoaded } = useAppSelector((state) => state.catalog);
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={4} key={product.id}>
            {!productLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product}></ProductCard>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
