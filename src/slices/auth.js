import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authapi";

function storeToken(state, { payload }) {
  state.credentials = { token: payload.token, user: { ...payload.user } };
  window.sessionStorage.setItem(
    "CREDENTIALS",
    JSON.stringify({
      token: payload.token,
      user: { ...payload.user },
    })
  );
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    credentials: JSON.parse(window.sessionStorage.getItem("CREDENTIALS")) || {
      token: "",
      user: {
        id: null,
        username: null,
      },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, storeToken);

    //login

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.credentials = {
        token: "",
        user: {
          id: null,
          username: null,
        },
      };
      window.sessionStorage.removeItem("CREDENTIALS");
    });
  },
});

export default authSlice.reducer;
