import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
// import { ConfigureStore } from "./app/Store/ConfigureStore";
import { Provider } from "react-redux";
import { store } from "./app/Store/ConfigureStore";
import { StoreProvider } from "./app/Context/StoreContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const store = ConfigureStore();
// console.log(store.getState());
export const history = createBrowserHistory();
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <StoreProvider>
        <App />
      </StoreProvider>
      {/* <Provider store={store}>

      
      </Provider> */}
    </HistoryRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
