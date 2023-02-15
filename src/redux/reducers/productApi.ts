import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddProduct,
  IParamsGet,
  IProducts,
  IPutProduct,
} from "../../utils/interface";

const productAPI = createApi({
  reducerPath: "productAPI",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_URL_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProducts, IParamsGet>({
      query: (params: IParamsGet) =>
        `/produtos/listar?size=${params.size}&page=${params.page}${
          params.filter ? `&name=${params.filter}` : ""
        }`,
      providesTags: ["products"],
    }),
    postProduct: builder.mutation<{ message: string }, FormData | IAddProduct>({
      query: (product: IAddProduct) => ({
        url: `/produtos/cadastrar`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["products"],
    }),
    putProduct: builder.mutation<{ message: string }, any>({
      query: (productParams: IPutProduct) => ({
        url: `/produtos/editar/${productParams.id}`,
        method: "PUT",
        body: productParams.body,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (idProduct: string) => ({
        url: `/produtos/delete/${idProduct}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export default productAPI;
