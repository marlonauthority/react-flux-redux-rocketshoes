// importa a funcao
import { createStore } from 'redux';

// reducer obrigatorio para iniciar
import rootReducer from './modules/rootReducer';
/**
 * reducer guarda as informacoes que podem ser compartilhadas em diferentes components
 */

// variavel que executa a funcao
const store = createStore(rootReducer);

export default store;
