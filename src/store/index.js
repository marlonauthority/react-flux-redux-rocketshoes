// importa a funcao
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

// reducer obrigatorio para iniciar
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
/**
 * reducer guarda as informacoes que podem ser compartilhadas em diferentes components
 */

const sagaMiddleware = createSagaMiddleware();

// Conexao ao Reactotron
const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddleware)
      )
    : applyMiddleware(sagaMiddleware);

// variavel que executa a funcao
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
