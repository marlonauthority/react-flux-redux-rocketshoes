import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmount } from './actions';
// o uso do * ao lado da function chama-se generator, e basicamente é o mesmo que usar o async, na verdade o async await é convertido pelo babel para generators " function* "
// um generator pode ser um pouco mais robusto, o add to cart fara uma chamada api
function* addToCart({ id }) {
  // verificar produdo no carrinho evita o duplicado
  // o select é responsavel por buscar informacoes no state
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );
  if (productExists) {
    const amount = productExists.amount + 1;
    yield put(updateAmount(id, amount));
  } else {
    // o yield e o call seria o mesmo que "await api.get('....')"
    const response = yield call(api.get, `/products/${id}`);
    // array alterado
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    // dispara action do redux
    yield put(addToCartSuccess(data));
  }
}
export default all([
  // -> chama uma vez no "click do usuario"
  takeLatest('@cart/ADD_REQUEST', addToCart),
]);
