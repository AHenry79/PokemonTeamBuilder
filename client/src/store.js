import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { api } from "./slice/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
