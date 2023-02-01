import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    filterProduct: {page: 0, size: 7, filter: ""}
  },
  reducers: {
    changeFilter(state, action: PayloadAction<string>) {
      state.filterProduct.filter = action.payload;
    },
    changePage(state, action: PayloadAction<number>) {
      state.filterProduct.page = action.payload;
    }
  }
})

export const { changeFilter, changePage } = productSlice.actions;
export default productSlice;