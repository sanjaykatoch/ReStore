import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { Product } from "../../app/model/Product";
import { RootState } from "../../app/Store/ConfigureStore";

const productAdapter = createEntityAdapter<Product>();


export const fetchProductsAsync = createAsyncThunk<Product[]>(
    "catalog/fetchProductsAsync",
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
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




export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productLoaded: false,
        status: 'idle'
    }),
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.productLoaded = true;
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
    })
});

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);