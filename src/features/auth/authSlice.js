import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/axiosInstance';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      // Build payload with either username or email
      const payload = { password };
      if (username) payload.username = username;
      if (email) payload.email = email;
      console.log('[authSlice] Sending login payload:', payload);
      const response = await authApi.post('auth/login', payload);
      console.log('[authSlice] API response:', response);
      // Expect response: { success, message, data }
      if (response.data && response.data.success && response.data.data) {
        console.log('[authSlice] Login succeeded, response data:', response.data.data);
        // Write to localStorage here (side effect)
        const data = response.data.data;
        try {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken || '');
          localStorage.setItem('user', JSON.stringify(data.user || {}));
          localStorage.setItem('testKey', 'testValue');
          console.log('[authSlice] localStorage after set:', {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            user: localStorage.getItem('user'),
            testKey: localStorage.getItem('testKey')
          });
        } catch (e) {
          console.error('[authSlice] Error writing to localStorage:', e);
        }
        return data;
      } else {
        console.log('[authSlice] Login failed, response:', response.data);
        return rejectWithValue(response.data?.message || 'Login failed');
      }
    } catch (err) {
      console.log('[authSlice] Exception during login:', err);
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('[authSlice] Reducer: login.fulfilled, payload:', action.payload);
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('[authSlice] Reducer: login.rejected, error:', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
