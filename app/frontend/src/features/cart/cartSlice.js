import { createSlice } from '@reduxjs/toolkit';

const cartFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cartItems: cartFromStorage,
};

const saveCart = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      saveCart(state.cartItems);
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.cartItems);
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (x) => x._id !== action.payload
        );
      }
      saveCart(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      saveCart(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
