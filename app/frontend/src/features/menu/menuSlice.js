import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createMenuItem,
  deleteMenuItem,
  fetchMenuItems,
  updateMenuItem,
} from '../../api/menuService';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMenuItems();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load menu'
      );
    }
  }
);

export const createMenu = createAsyncThunk(
  'menu/createMenu',
  async (payload, { rejectWithValue }) => {
    try {
      return await createMenuItem(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save menu item'
      );
    }
  }
);

export const editMenu = createAsyncThunk(
  'menu/editMenu',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateMenuItem(id, payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save menu item'
      );
    }
  }
);

export const removeMenu = createAsyncThunk(
  'menu/removeMenu',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMenuItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete menu item'
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  actionLoading: false,
  error: '',
  successMessage: '',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearMenuFeedback: (state) => {
      state.error = '';
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load menu';
      })
      .addCase(createMenu.pending, (state) => {
        state.actionLoading = true;
        state.error = '';
        state.successMessage = '';
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items.push(action.payload);
        state.successMessage = 'Food item added successfully!';
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || 'Failed to save menu item';
      })
      .addCase(editMenu.pending, (state) => {
        state.actionLoading = true;
        state.error = '';
        state.successMessage = '';
      })
      .addCase(editMenu.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.successMessage = 'Menu item updated successfully!';
      })
      .addCase(editMenu.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || 'Failed to save menu item';
      })
      .addCase(removeMenu.pending, (state) => {
        state.actionLoading = true;
        state.error = '';
        state.successMessage = '';
      })
      .addCase(removeMenu.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.successMessage = 'Menu item deleted successfully!';
      })
      .addCase(removeMenu.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || 'Failed to delete menu item';
      });
  },
});

export const { clearMenuFeedback } = menuSlice.actions;
export default menuSlice.reducer;
