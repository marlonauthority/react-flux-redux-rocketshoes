import React, { useState, useEffect } from 'react';
// Nome auto sugestivo, eé uma funcao que fara o component se conectar ao redux, observe na ultima linha da deste component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
// Actions
import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get(`/products`);

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    addToCartRequest(id);
  }

  return (
    <ProductList loading={loading}>
      {loading === true ? <FaSpinner color="#fff" size={24} /> : null}

      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
              {amount[product.id] || 0}
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
