import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/model/Product";
import { useAppDispatch, useAppSelector } from "../../app/Store/ConfigureStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";
import ProductList from "./ProductList/ProductList";

interface Props {
  products: Product[];
  AddProduct: () => void;
}

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);

  const products = useAppSelector(productSelectors.selectAll);
  const { productLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  if (status.includes("pendingFetchProducts"))
    return <LoadingComponent message="Loadig Products..." />;
  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
