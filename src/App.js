import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// esta funcao Provider dera acesso do "store" a todos os components
import { Provider } from 'react-redux';
import store from './store';

import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}
