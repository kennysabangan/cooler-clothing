import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.scss';
import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="cart-dropdown-container">
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button onClick={handleGoToCheckout}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;