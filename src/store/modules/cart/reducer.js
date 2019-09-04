// todo reducer recebe um state que é estado inicial"aqui ê um array vazio" e recebe tambem uma action que dira o que deve ser feito
export default function cart(state = [], action) {
  // aqui ficará ouvindo a action
  switch (action.type) {
    // caso a action disparada "dispatch" for igual a:
    case 'ADD_TO_CART':
      // retorna um novo State
      // aqui pegamos tudo o que ja existe "..." e podemos manter o state assim ou alterar ele adiconando mais coisa, como abaixo:
      return [
        ...state,
        {
          // copia todas as informacoes que vem de dentro do product
          ...action.product,
          // adciona mais um informacao ao array
          amount: 1,
        },
      ];
    // Estado default caso nao tenha acontecido NADA
    default:
      return state;
  }
}
