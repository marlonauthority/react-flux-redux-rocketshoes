// funcao que combina varios reducer para serem repassados la no store
import { combineReducers } from 'redux';
import cart from './cart/reducer';

export default combineReducers({
  cart,
});
