import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./redux";
import './index.css';
import App from './App';
import "antd/dist/reset.css";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

store.subscribe(() => {
  console.log('State has been refreshed or changed.');
});

reportWebVitals();
