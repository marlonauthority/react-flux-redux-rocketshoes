// importa a funcao
import { createStore } from 'redux';

// reducer obrigatorio para iniciar
import rootReducer from './modules/rootReducer';
/**
 * reducer guarda as informacoes que podem ser compartilhadas em diferentes components
 */

// Conexao ao Reactotron
const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

// variavel que executa a funcao
const store = createStore(rootReducer, enhancer);

export default store;
