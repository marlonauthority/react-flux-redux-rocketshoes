import produce from 'immer';

// todo reducer recebe um state que é estado inicial"aqui ê um array vazio" e recebe tambem uma action que dira o que deve ser feito
export default function cart(state = [], action) {
  // aqui ficará ouvindo a action
  switch (action.type) {
    // caso a action disparada "dispatch" for igual a:
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({ ...action.product, amount: 1 });
        }
      });
    // Estado default caso nao tenha acontecido NADA
    default:
      return state;
  }
}
