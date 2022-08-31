import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { MetaData } from "../../app/model/Pagination";
import { Product, ProductParams } from "../../app/model/Product";
import { RootState } from "../../app/Store/ConfigureStore";





interface CatalogState {
    productLoaded: boolean;
    filterLoaded: boolean;
    status: string,
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;

}

const productAdapter = createEntityAdapter<Product>();

function getAxiosParam(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", productParams.pageNumber.toString())
    params.append("pageSize", productParams.pageSize.toString())
    params.append("orderBy", productParams.orderBy.toString())
    if (productParams.searchTerm) params.append("searchTerm", productParams.searchTerm.toString())
    if (productParams.brands && productParams.brands.length > 0) params.append("brands", productParams.brands.toString())
    if (productParams.types && productParams.types.length > 0) params.append("types", productParams.types.toString())
    return params;
}


export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    "catalog/fetchProductsAsync",
    async (_, thunkAPI) => {
        const params = getAxiosParam(thunkAPI.getState().catalog.productParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    "catalog/fetchProductAsync",
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const fetchFilters = createAsyncThunk(
    'catalog/FetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.fetchFilters();
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: "name"
    }
}
export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState<CatalogState>({
        productLoaded: false,
        filterLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 }
        },
        setPageNumber: (state, action) => {
            state.productLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload }
        },
        resetProductParams: (state, action) => {
            state.productParams = initParams();
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        }

    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            // setTimeout(() => {
            productAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.productLoaded = true;

            // }, 1000);


        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchProductAsync.fulfilled, (state) => {
            state.status = 'pendingFetchProduct'
        });
        builder.addCase(fetchProductAsync.pending, (state, action) => {
            productAdapter.upsertOne(state, action.payload!);
            state.status = "idle";
        });

        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle'
        });

        builder.addCase(fetchFilters.pending, (state, action) => {
            state.status = 'pendingFetchFilters'
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.type;
            state.filterLoaded = true;
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    })
});

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);


export const { setProductParams, resetProductParams, setMetaData, setPageNumber } = catalogSlice.actions;