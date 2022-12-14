import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const deleteItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemsFromCart = () => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, [])
}