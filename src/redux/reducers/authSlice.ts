import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: ''
  },
  reducers: {
    getNameLoggedUser(state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  }
})

export const { getNameLoggedUser } = authSlice.actions;
export default authSlice;