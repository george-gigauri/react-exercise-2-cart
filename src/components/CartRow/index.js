const CartRow = ({ product, onPlus, onMinus, onRemove }) => {

  const handlePlus = () => {
    onPlus(product);
  }

  const handleMinus = () => {
    onMinus(product);
  }

  const handleRemove = () => {
    onRemove(product);
  }

  const { id, name, price, imgUrl } = product;
  return <tr key={`product-${id}`}>
    <td className='prod-img '><img className="resp-img" src={imgUrl} alt={name} /></td>
    <td>{name}</td>
    <td>{price}</td>
    <td>{JSON.parse(localStorage.getItem("cart"))[product.id]}</td>
    <td><b>{JSON.parse(localStorage.getItem("cart"))[product.id] * price}</b></td>
    <td>
      <div>
        <b style={{ fontSize: "25px", color: "orange", cursor: "pointer" }} onClick={handleMinus}>( - )</b>
        <b style={{ fontSize: "25px", color: "green", cursor: "pointer" }} onClick={handlePlus}>( + )</b>
        <b style={{ fontSize: "25px", color: "red", cursor: "pointer" }} onClick={handleRemove}>( X )</b>
      </div>
    </td>
  </tr>
}

export default CartRow