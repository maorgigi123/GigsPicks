import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom'

import { store, persistor } from './store/store.js';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
              <App />
            </BrowserRouter>
    </PersistGate>
    </Provider>
)
