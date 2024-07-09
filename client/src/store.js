import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { api } from "./slice/api";
import teamReducer from "./slice/teamSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    team: teamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
