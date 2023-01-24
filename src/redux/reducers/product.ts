import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { API } from "../../utils/api";
import { IParamsGetProducts, IProducts, IInitialState } from "../../utils/interface";

export const getProducts = createAsyncThunk('products/getProducts', async (params: IParamsGetProducts, thunkAPI) => {
  try {
    const { data } = await API.get<IProducts[]>(`/produtos/listar?size=${params.size}&page=${params.page}${params.filter ? `&name=${params.filter}` : ''}`)
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  data: null,
  isLoading: false,
  isError: null
} as IInitialState;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => { 
      state.isLoading = true 
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }: PayloadAction<IProducts[]>) => { 
      state.isLoading = false; 
      state.data = payload; 
    });
    builder.addCase(getProducts.rejected, (state, { payload }: PayloadAction<any>) => { 
      state.isLoading = false; 
      state.data = payload; 
    });
  }
});

export default productSlice.reducer;