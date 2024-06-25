import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/authapi";
import auth from "./slices/auth";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export default store;
