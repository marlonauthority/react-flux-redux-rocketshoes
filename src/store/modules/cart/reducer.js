// todo reducer recebe um state que é estado inicial"aqui ê um array vazio" e recebe tambem uma action que dira o que deve ser feito
export default function cart(state = [], action) {
  // aqui ficará ouvindo a action
  switch (action.type) {
    // caso a action disparada "dispatch" for igual a:
    case 'ADD_TO_CART':
      // retorna um novo State
      // aqui pegamos tudo o que ja existe "..." e adicionamos mais o que veio da action
      return [...state, action.product];
    // Estado default caso nao tenha acontecido NADA
    default:
      return state;
  }
}
