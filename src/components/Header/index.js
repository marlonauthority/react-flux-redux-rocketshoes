import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';
import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';

function Header(props) {
  // console.log(props.cart);
  const cartSize = props.cart.length;

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

/**
 * o connect pode receber parametros, a primeira é uma funcao
 *  por exemplo aqui recemos um estado inteiro do redux, e as informacoes que queira acessar
 * estao acessiveis usando um objeto ({ })
 * */
export default connect(state => ({
  // criamos um objeto, com o conteudo do reducer a ser acessado, esse nome esta la no rootReducer.js
  cart: state.cart,
}))(Header);
