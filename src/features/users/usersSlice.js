import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Add UI-only state here if needed
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Add reducers for local UI state if needed
  },
});

export default usersSlice.reducer;
