import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmountSuccess } from './actions';
// o uso do * ao lado da function chama-se generator, e basicamente é o mesmo que usar o async, na verdade o async await é convertido pelo babel para generators " function* "
// um generator pode ser um pouco mais robusto, o add to cart fara uma chamada api
function* addToCart({ id }) {
  // verificar produdo no carrinho evita o duplicado
  // o select é responsavel por buscar informacoes no state
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );
  // chamada api
  const stock = yield call(api.get, `/stock/${id}`);
  // quantidade no estoque
  const stockAmount = stock.data.amount;
  // quantidade no carrinho
  const currentAmount = productExists ? productExists.amount : 0;
  // nova qtd adcionada no carrinho
  const amount = currentAmount + 1;
  // se no carrinho for maior que a qtd do estoque
  if (amount > stockAmount) {
    toast.error('Quandidade solicitada fora do estoque');
    return;
  }
  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
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

function* updateAmount({ id, amount }) {
  // se o user tentar diminuir a quantidade abaixo ou a 0
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quandidade solicitada fora do estoque');
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}

export default all([
  // -> chama uma vez no "click do usuario"
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
