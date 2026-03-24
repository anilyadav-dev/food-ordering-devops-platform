import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginAdmin as loginAdminRequest,
  loginUser as loginUserRequest,
  registerUser as registerUserRequest,
} from '../../api/authService';

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const persistUser = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      return await loginUserRequest(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      return await registerUserRequest(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (payload, { rejectWithValue }) => {
    try {
      return await loginAdminRequest(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Admin login failed'
      );
    }
  }
);

const initialState = {
  userInfo: userFromStorage,
  loading: false,
  error: '',
  successMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      persistUser(action.payload);
    },
    logout: (state) => {
      state.userInfo = null;
      state.error = '';
      state.successMessage = '';
      localStorage.removeItem('userInfo');
    },
    clearAuthFeedback: (state) => {
      state.error = '';
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.loading = true;
      state.error = '';
      state.successMessage = '';
    };

    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Request failed';
    };

    builder
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.successMessage = 'Login successful!';
        persistUser(action.payload);
      })
      .addCase(loginUser.rejected, setRejected)
      .addCase(registerUser.pending, setPending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.successMessage = 'Registration successful!';
        persistUser(action.payload);
      })
      .addCase(registerUser.rejected, setRejected)
      .addCase(loginAdmin.pending, setPending)
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        persistUser(action.payload);
      })
      .addCase(loginAdmin.rejected, setRejected);
  },
});

export const { setCredentials, logout, clearAuthFeedback } = authSlice.actions;
export default authSlice.reducer;
