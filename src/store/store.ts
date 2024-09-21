// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import CartesianReducer from '@slice/cartesian/Cartesian-slice'



export const store = configureStore({
  reducer: {CartesianReducer},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
