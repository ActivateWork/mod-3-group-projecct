import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("Inside of userSlice :", state.user);
    },
    logout: state => {
      localStorage.removeItem("token");
      state.user = {};
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
