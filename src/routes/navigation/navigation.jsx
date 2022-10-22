import { Outlet } from 'react-router-dom'
import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink> ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>

      <Outlet />
    </>
  )
}

export default Navigation;