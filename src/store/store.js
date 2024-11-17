import { configureStore } from '@reduxjs/toolkit';
import wineReducer from './wineSlice';

const store = configureStore({
  reducer: {
    wine: wineReducer,
  },
});

export default store;
