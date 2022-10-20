import { createContext, useReducer } from "react";
import { createAction } from "../utils/firebase/reducer/reducer.utils";

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
  cartTotal: 0,
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

export const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer.`)
  }
}


export const CartProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(CartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, item) =>
      total + item.quantity, 0);

    const newCartTotal = newCartItems.reduce((total, item) =>
      total + item.quantity * item.price, 0);

    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    }

    // dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: payload })
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    updateCartItemsReducer(newCartItems);
  }

  const deleteItemFromCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete)
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const cartProps = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, deleteItemFromCart, cartTotal, cartCount };

  return (
    <CartContext.Provider value={cartProps}>{children}</CartContext.Provider>
  )
}