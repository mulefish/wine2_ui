import { createSlice } from '@reduxjs/toolkit';

const wineSlice = createSlice({
  name: 'wine',
  initialState: {
    response: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    setResponse(state, action) {
      state.response = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setResponse, setStatus } = wineSlice.actions;

export default wineSlice.reducer;
