import { deleteItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';

import {
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem}) => {
  const dispatch = useDispatch();

  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const deleteItemHandler = () => dispatch(deleteItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={deleteItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;