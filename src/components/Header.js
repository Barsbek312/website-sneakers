import { Link } from 'react-router-dom';
import React from 'react';
import {useCart} from '../hooks/useCart';

function Header(props) {
  const {totalPrice} = useCart()

    return(
        <header className="d-flex justify-between align-center p-40">
          <Link to="/">
            <div className="header__left d-flex align-center">;
              <img className="mr-15" alt="Logo" src="/img/logo.svg"/>
              <div className="header__info">
                <h3 className="text-uppercase">REACT SNEAKERS</h3>
                <p className="opacity-5">Магазин лучших кроссовок</p>
              </div>
            </div> 
          </Link>
          <ul className="header__right d-flex align-center">
            <li onClick={props.onClickCart} className="mr-30 cu-p d-flex align-center">
              <img className="mr-15" alt="cart" width={18} height={18} src="/img/cart.svg"/>
              <span>{totalPrice} руб.</span>
            </li>
            <li className="mr-30 cu-p d-flex align-center">
              <Link to="/favorites"><img alt="heart" width={18} height={18} src="/img/heart.svg"/></Link>
            </li>
            <li className="d-flex align-center">
              <Link to="/orders"><img alt="user" width={18} height={18} src="/img/user.svg"/></Link>
            </li>
          </ul>
        </header>
    );
}


export default Header;