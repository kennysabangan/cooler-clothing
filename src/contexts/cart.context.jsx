import { createContext, useEffect, useState } from "react";

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

const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
  }

  return cartItems.map((cartItem) => cartItem.id === productToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  )
}

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  total: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, item) =>
    total + item.quantity, 0);
    setCartCount(newCartCount);

    const newCartTotal = cartItems.reduce((total, item) =>
    total + item.quantity * item.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete))
  }

  const cartProps = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, deleteItemFromCart, cartTotal, cartCount };

  return (
    <CartContext.Provider value={cartProps}>{children}</CartContext.Provider>
  )
}