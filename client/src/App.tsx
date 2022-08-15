import React, { useEffect, useState } from "react";
import "./App.css";
import Catalog from "./features/catalog/Catalog";
import { CssBaseline, Container } from "@mui/material";
import Header from "./app/layout/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/Home/HomePage";
import ProductDetail from "./features/catalog/ProductDetail/ProductDetail";
import AboutPage from "./features/About/AboutPage";
import ContactPage from "./features/Contact/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "./app/errors/serverError";
import NotFound from "./app/errors/notFound";
import BasketPage from "./features/Basket/BasketPage";
import { useStoreContext } from "./app/Context/StoreContext";
import { getCookie } from "./app/util/util";
import agent from "./app/api/agent";
import LoadingComponent from "./app/layout/LoadingComponent";
import CheckoutPage from "./features/Checkout/CheckoutPage";

// const products=[
//   {
// name:'gear',price:'100.00',
//   },{
//     name:'clutch',price:'200.00'
//   }
// ];

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading)
    return <LoadingComponent message="Intializine App .."></LoadingComponent>;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header
        darkMode={darkMode}
        handleThemeChange={handleThemeChange}
      ></Header>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/serverError" element={<ServerError />} />
          <Route path="/basket" element={<BasketPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
