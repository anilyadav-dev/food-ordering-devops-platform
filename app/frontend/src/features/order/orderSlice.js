import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchOrderHistory as fetchOrderHistoryRequest,
  placeOrder as placeOrderRequest,
} from '../../api/orderService';
import { clearCart } from '../cart/cartSlice';

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchOrderHistoryRequest(userId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load order history'
      );
    }
  }
);

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const state = getState();
    const userId = state.auth.userInfo?._id;
    const cartItems = state.cart.cartItems;

    if (!userId) {
      return rejectWithValue('Please login first');
    }

    if (cartItems.length === 0) {
      return rejectWithValue('Your cart is empty. Add items before ordering.');
    }

    try {
      const result = await placeOrderRequest({ userId, cartItems });
      dispatch(clearCart());
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to place order'
      );
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  placingOrder: false,
  error: '',
  successMessage: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderFeedback: (state) => {
      state.error = '';
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load order history';
      })
      .addCase(placeOrder.pending, (state) => {
        state.placingOrder = true;
        state.error = '';
        state.successMessage = '';
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.placingOrder = false;
        state.successMessage = 'Order placed successfully!';
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placingOrder = false;
        state.error = action.payload || 'Failed to place order';
      });
  },
});

export const { clearOrderFeedback } = orderSlice.actions;
export default orderSlice.reducer;
