import { useSelector } from 'react-redux';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
      {
        cartItems.length ? (
          cartItems.map((item) => (<CartItem key={item.id} item={item} />
        ))) : (
          <EmptyMessage>Your cart is empty.</EmptyMessage>
        )
      }
      </CartItems>
      <Button onClick={handleGoToCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;