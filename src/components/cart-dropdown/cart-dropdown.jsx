import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleGoToCheckout = () => {
    navigate('/checkout')
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.parentElement.id !== 'cart-icon') {
        dispatch(setIsCartOpen(false));
      }
    }

    window.addEventListener('mousedown', handleOutsideClick);

    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [dispatch])

  return (
    <CartDropdownContainer ref={dropdownRef}>
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