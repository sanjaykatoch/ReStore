import React, { useEffect, useState } from "react";
import "./App.css";
import Catalog from "./features/catalog/Catalog";
import {  CssBaseline, Container } from "@mui/material";
import Header from "./app/layout/Header/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
