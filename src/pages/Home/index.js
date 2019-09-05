import React, {Component} from 'react';
// Nome auto sugestivo, eé uma funcao que fara o component se conectar ao redux, observe na ultima linha da deste component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
// Actions
import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

 class Home extends Component {
  state = {
    products : [],

  }

  async componentDidMount() {

    const response = await api.get(`/products`);
    // formata o preco antes de ir para o render

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({
      products: data
    });
  }

  handleAddProduct = product => {
    const { addToCart } = this.props;
    addToCart(product)
  }

  render() {
    const { products } = this.state;
    const { amount } = this.props

    return (

      <ProductList>
        { products.map(product => (
          <li key={product.id}>
        <img
          src={product.image}
          alt={product.title}
        />
        <strong>{product.title}</strong>
        <span>{product.priceFormatted}</span>

        <button type="button" onClick={() => this.handleAddProduct(product)}>
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> {amount[product.id] || 0}
          </div>
          <span>Adicionar ao carrinho</span>
        </button>
      </li>
        )) }

    </ProductList>

    )
  }
}

const mapStateToProps = state => ({
  // percorre o estado do carrinho
  amount: state.cart.reduce((amount, product) => {
    // retorna um objeto com o id de cada produto e sua propriedade é o amount
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

// -> Converte actions do redux em propriedes do component
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

// exporta-se o componente passando como uma 2ª funcao o nome do component, deste modo pode-se fazer o uso do redux
export default connect(mapStateToProps, mapDispatchToProps)(Home);
