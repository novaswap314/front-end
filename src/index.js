import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from '@/store';
import { Provider } from "react-redux";
import { theme, ThemedGlobalStyle, FixedGlobalStyle } from './theme'
import { ThemeProvider } from 'styled-components';
import 'uno.css';
import './libs/wagmi.js';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // 在App组件外包一层Provider
  <Provider store={store}>
    <FixedGlobalStyle />
    <ThemeProvider theme={theme()}>
      <ThemedGlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>
)
