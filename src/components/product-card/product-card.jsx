import Button, { BUTTON_TYPE_CLASSES } from '../button/button';
import { Dollar, Footer, Name, Price, ProductCardContainer } from './product-card.styles';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems)
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <Footer>
        <Name>{name}</Name>
        <Price>
          <Dollar>$</Dollar>
          {price}
        </Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </ProductCardContainer>
  )
}

export default ProductCard;