import { useEffect, useState } from "react";
import { Product } from "../../app/model/Product";
import ProductList from "./ProductList/ProductList";

interface Props {
  products: Product[];
  AddProduct: () => void;
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5000/api/Product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
