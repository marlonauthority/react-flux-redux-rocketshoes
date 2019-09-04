import React, {Component} from 'react';
// Nome auto sugestivo, eé uma funcao que fara o component se conectar ao redux, observe na ultima linha da deste component
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
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
    // todo component que se conecta ao redux recebe uma propriedade dispatch
    const { dispatch } = this.props;
    // dispatch dispara uma Action ao Redux aqui por exemplo queremos adcionar um product ao carrinho
    // -> Action propriamente dita, lembrando que eé necessario um "type"
    dispatch({
      type: 'ADD_TO_CART',
      product,
    })
  }

  render() {
    const { products } = this.state;

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
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>
          <span>Adicionar ao carrinho</span>
        </button>
      </li>
        )) }

    </ProductList>

    )
  }
}

// exporta-se o componente passando como uma 2ª funcao o nome do component, deste modo pode-se fazer o uso do redux
export default connect()(Home);
