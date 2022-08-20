import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux"
import { basketSlice } from "../../features/Basket/BasketSlice";
import { catalogSlice } from "../../features/catalog/CatalogSlice";
import CounterReducer from "../../features/Contact/CounteeReducer";
import { counterSlice } from "../../features/Contact/CounterSlice";

// export function ConfigureStore() {
//     return createStore(CounterReducer);
// }


export const store: any = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer
    }
})

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;