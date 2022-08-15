import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux"
import CounterReducer from "../../features/Contact/CounteeReducer";
import { counterSlice } from "../../features/Contact/CounterSlice";

// export function ConfigureStore() {
//     return createStore(CounterReducer);
// }


export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type  AppDispatch=typeof store.dispatch;

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;