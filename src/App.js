import React from 'react';
import { Router } from 'react-router-dom';
// esta funcao Provider dera acesso do "store" a todos os components
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
// reatotron
import './config/ReactotronConfig';
import history from './services/history';
import store from './store';
import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <ToastContainer autoClose={3000} closeOnClick />
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
}
