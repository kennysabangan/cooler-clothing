import './cart-item.styles.jsx';
import { CartItemContainer, ItemDetails } from './cart-item.styles.jsx';

const CartItem = ({ item }) => {
  const { name, quantity, imageUrl, price } = item;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <ItemDetails>
        <span>{name}</span>
        <span>{quantity} x ${price}</span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;