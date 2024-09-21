// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';




// export const store = configureStore({
//   reducer: {CartesianReducer},
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { combineReducers } from 'redux';
import CartesianReducer from '@slice/cartesian/Cartesian-slice'

// Redux Persist imports
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Combine your reducers
const rootReducer = combineReducers({
  CartesianReducer: CartesianReducer,
  // Add other reducers here if you have them
});

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage,
  // You can blacklist or whitelist specific reducers if needed
  // blacklist: ['someTemporaryReducer'],
  // whitelist: ['matches'],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);

// Export types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

