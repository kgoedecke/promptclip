import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { PromptsProvider } from "./contexts/prompts.context";
import { BrowserRouter } from 'react-router-dom';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    })
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PromptsProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </PromptsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
