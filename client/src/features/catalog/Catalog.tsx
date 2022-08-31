import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import AppPagination from "../../app/components/AppPagination";
import CheckBoxButton from "../../app/components/CheckBoxButton";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/model/Product";
import { useAppDispatch, useAppSelector } from "../../app/Store/ConfigureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./CatalogSlice";
import ProductList from "./ProductList/ProductList";
import ProductSearch from "./ProductSearch";

interface Props {
  products: Product[];
  AddProduct: () => void;
}

const sortOptions = [
  { value: "name", label: "Alphabet" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "price", label: "Price - Low to High" },
];
export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);

  const products = useAppSelector(productSelectors.selectAll);
  const {
    productLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (!productLoaded) return <LoadingComponent message="Loadig Products..." />;
  return (
    <>
      <Grid container columnSpacing={4} rowSpacing={1}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={(e) =>
                dispatch(setProductParams({ orderBy: e.target.value }))
              }
            />
            {/* <FormControl>
              <RadioGroup>
                {sortOptions.map(({ value, label }) => (
                  <FormControlLabel
                    value={value}
                    key={value}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl> */}
          </Paper>

          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckBoxButton
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ brands: items }))
              }
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckBoxButton
              items={types}
              checked={productParams.types}
              onChange={(typeItems: string[]) =>
                dispatch(setProductParams({ types: typeItems }))
              }
            />

            {/* <FormGroup>
              {types?.map((type: any) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={type}
                  key={type}
                />
              ))}
            </FormGroup> */}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products}></ProductList>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          {metaData && (
            <AppPagination
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setPageNumber({ pageNumber: page }))
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
