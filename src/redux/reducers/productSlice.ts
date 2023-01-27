import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    filterProduct: {page: 0, size: 10, filter: ""}
  },
  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      state.filterProduct.filter = action.payload;
    }
  }
})

export const {changeFilter} = productSlice.actions;
export default productSlice;