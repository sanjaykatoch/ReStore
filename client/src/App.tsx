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
import { ContactPage } from "@mui/icons-material";

// const products=[
//   {
// name:'gear',price:'100.00',
//   },{
//     name:'clutch',price:'200.00'
//   }
// ];

function App() {
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

  return (
    <ThemeProvider theme={theme}>
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
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>

        {/* <Catalog /> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
