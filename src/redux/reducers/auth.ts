import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { API } from "../../utils/api";

import { ILogin, IInitialState } from "../../utils/interface";

export const handleLogin = createAsyncThunk('login', async (infoLogin: ILogin) => {
  const { data } = await API.post('/autenticacao', infoLogin);
  localStorage.setItem('token', data);
  return data;
})

const initialState = {
  data: null,
  isLoading: false,
  isError: null
} as IInitialState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state) => { 
      state.isLoading = true 
    });
    builder.addCase(handleLogin.fulfilled, (state, { payload }: PayloadAction<string>) => { 
      state.isLoading = false; 
      state.data = payload; 
    });
    builder.addCase(handleLogin.rejected, (state, { payload }: PayloadAction<any>) => { 
      state.isLoading = false; 
      state.data = payload; 
    });
  }
});

export default authSlice.reducer;