import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import { PromptsProvider } from './contexts/prompts.context';
import { UpdateProvider } from './contexts/update.context';

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '',
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <PromptsProvider>
          <UpdateProvider>
            <App />
          </UpdateProvider>
        </PromptsProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
