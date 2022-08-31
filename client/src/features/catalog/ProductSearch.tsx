import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/Store/ConfigureStore";
import { setProductParams } from "./CatalogSlice";

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useDispatch();

  const debouncedSearch = debounce((event: any) => {
    // if (productParams.searchTerm != searchTerm) {
    dispatch(setProductParams({searchTerm:event.target.value}));
    // }
  }, 3000);
  return (
    <TextField
      label="Search Product"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
};

export default ProductSearch;
