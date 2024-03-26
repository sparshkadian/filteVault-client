import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Provider store={store}>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </Provider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
