import { useEffect, useState } from 'react';
import './cartPage.css';
import CartRow from '../CartRow';

const CartPage = () => {
  const [addedProducts, setAddedProducts] = useState({ data: [], loading: true });

  useEffect(() => {
    fetch("http://localhost:3001/products").then(res => {
      if (res.ok) return res.json();
    }).then(res => {
      const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
      const addedItems = res.filter(product => cartAssoc[product.id]);
      setAddedProducts({ data: addedItems, loading: false });
    });
  }, []);

  function getQuantity(productId) {
    return JSON.parse(localStorage.getItem("cart"))[productId]
  }

  const handleAddToCart = (itemData) => {
    var prevItems = JSON.parse(localStorage.getItem("cart"));
    prevItems[itemData.id] = prevItems[itemData.id] + 1
    localStorage.setItem("cart", JSON.stringify(prevItems));
    let result = addedProducts.data.filter(i => prevItems[i.id]).filter(i => JSON.parse(localStorage.getItem("cart"))[i.id] > 0);
    setAddedProducts({ data: result, loading: false });
  }

  const handleRemoveFromCart = (itemData) => {
    var prevItems = JSON.parse(localStorage.getItem("cart"));
    if (prevItems[itemData.id] !== null) {
      prevItems[itemData.id] = prevItems[itemData.id] - 1
    }
    localStorage.setItem("cart", JSON.stringify(prevItems));
    let result = addedProducts.data.filter(i => prevItems[i.id]).filter(i => JSON.parse(localStorage.getItem("cart"))[i.id] > 0);
    setAddedProducts({ data: result, loading: false });
  }

  const handleDeleteWholeFromCart = (itemData) => {
    var prevItems = JSON.parse(localStorage.getItem("cart"));
    prevItems[itemData.id] = 0;
    localStorage.setItem("cart", JSON.stringify(prevItems));
    let result = addedProducts.data.filter(i => prevItems[i.id]).filter(i => JSON.parse(localStorage.getItem("cart"))[i.id] > 0);
    setAddedProducts({ data: result, loading: false });
  }


  /* რეალურ პროექტში ყველა პროდუქტს არ მოვითხოვთ სერვერიდან,
  სერვერზე POST მეთოდით უნდა გაიგზავნოს პროდუქტების id - ბის მასივი და backend-სგან ვიღებთ ამ id - ბის შესაბამის პროდუქტების სიას.
  უბრალოდ json სერვერი არ გვაძლევს ამის შესაძლებლობას
  */

  if (addedProducts.loading) return "...loading";

  if (!addedProducts.data.length && !addedProducts.loading) return "No Items added";

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th><b>Subtotal</b></th>
            <th><b style={{ color: "green" }}>Action</b></th>
          </tr>
        </thead>
        <tbody>
          {
            addedProducts.data.map(product => <CartRow
              product={product}
              onPlus={handleAddToCart}
              onMinus={handleRemoveFromCart}
              onRemove={handleDeleteWholeFromCart} />)
          }

        </tbody>
      </table>

      <br />
      <h2><b>Total: {(() => {
        var result = 0;
        addedProducts.data.forEach(p => result += JSON.parse(localStorage.getItem("cart"))[p.id] * p.price)
        return result
      })()}$</b></h2>
    </div>);
}

export default CartPage;