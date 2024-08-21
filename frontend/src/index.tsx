import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store/store';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import setupInterceptors from './services/setupInterceptors';
import './index.css';
// import CanvasJSReact from '@canvasjs/react-charts';
// const CanvasJSReact = require('@canvasjs/react-charts');

// const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
setupInterceptors(store);
reportWebVitals();
