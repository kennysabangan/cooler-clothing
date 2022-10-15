import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if product already exists in cart
  const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  // if product exists in cart, add to quantity in cart
  if (existingItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  // else add the new product to the cart
  return [ ...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const cartProps = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

  return (
    <CartContext.Provider value={cartProps}>{children}</CartContext.Provider>
  )
}