import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import PaymentFormReducer from './features/paymentForm';
import PaymentsReducer from './features/payments';
import PlatformNamesReducer from './features/platformNames';
import PlatformsReducer from './features/platforms';
import ClientsReducer from './features/clients';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//configuring store
const store = configureStore({
  reducer: {
    payments: PaymentsReducer,
    //paymentForm: PaymentFormReducer,
    clients: ClientsReducer,
    platforms: PlatformsReducer,
    platformNames: PlatformNamesReducer,
  },
});

const rootElement = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
