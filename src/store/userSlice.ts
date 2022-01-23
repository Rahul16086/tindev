import { createSlice } from "@reduxjs/toolkit";

export type authObject = {
  isAuth: boolean;
  token: string;
};

const initialState: authObject = {
  isAuth: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
    },
    setAuthLogout: (state) => {
      state.isAuth = false;
      state.token = "";
    },
  },
});

export const { setAuth, setAuthLogout } = userSlice.actions;

// export const isAuth = (state: { user: { isAuth: boolean } }) =>
//   state.user.isAuth;
// export const token = (state: { user: { token: string } }) => state.user.token;

export default userSlice.reducer;
