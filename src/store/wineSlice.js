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
    addWine(state, action) {
      if (!state.response) {
        state.response = { data: [] }; // Initialize `response` and `data`
      }
      if (!Array.isArray(state.response.data)) {
        state.response.data = []; // Ensure `data` is an array
      }
      state.response.data.push(action.payload); // Add the wine to `data`
    }
  }
});

export const { setResponse, setStatus, addWine } = wineSlice.actions;

export default wineSlice.reducer;
