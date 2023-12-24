import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import store from './store.js'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>

);

