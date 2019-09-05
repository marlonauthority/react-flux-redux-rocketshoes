import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess } from './actions';
// o uso do * ao lado da function chama-se generator, e basicamente é o mesmo que usar o async, na verdade o async await é convertido pelo babel para generators " function* "
// um generator pode ser um pouco mais robusto, o add to cart fara uma chamada api
function* addToCart({ id }) {
  // o yield e o call seria o mesmo que "await api.get('....')"
  const response = yield call(api.get, `/products/${id}`);
  // dispara action do redux
  yield put(addToCartSuccess(response.data));
}
export default all([
  // -> chama uma vez no "click do usuario"
  takeLatest('@cart/ADD_REQUEST', addToCart),
]);
