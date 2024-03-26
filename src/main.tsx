import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { FileProvider } from './context/FileContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <FileProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </PersistGate>
        </FileProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
