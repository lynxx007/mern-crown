import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authSlice from "./auth/authSlice";
import uiSlice from "./UI/uiSlice";
import clientSecretSlice from "./clientSecret";
import cartSlice from "./cart/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const cartPersistConfig = {
  key: "cart",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistedAuthReducer,
  ui: uiSlice,
  cart: persistedCartReducer,
  clientSecret: clientSecretSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
