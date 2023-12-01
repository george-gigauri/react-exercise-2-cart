import './mainPage.css'
import ItemList from "../ItemsList";
import Cart from '../Cart';
import { useEffect } from 'react';
import { useState } from 'react';
import CartContext from '../../contexts/cartContext';


const MainPage = () => {
  const defaultCartState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};
  const [products, setProducts] = useState({ data: [], loading: true });
  const [cartItems, setCartItems] = useState(defaultCartState);

  useEffect(() => {
    fetch("http://localhost:3001/products").then(res => {
      if (res.ok) return res.json();
    }).then(res => {
      setProducts({ data: res, loading: false });
    })
  }, []);

  if (products.loading) return "...loading";

  return <CartContext.Provider value={{ cartItems, setCartItems }}>
    <ItemList data={products.data} />
    <Cart />
  </CartContext.Provider>;
}

export default MainPage;