import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './fonts/Roboto-Black.ttf'
import './fonts/Roboto-Bold.ttf'
import './fonts/Roboto-Medium.ttf'
import './fonts/Roboto-Regular.ttf'
import './fonts/Roboto-Light.ttf'

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

