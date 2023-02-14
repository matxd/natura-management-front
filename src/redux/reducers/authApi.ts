import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ILogin } from "../../utils/interface";

const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL_API }),
  endpoints: (builder) => ({
    postAuthorization: builder.mutation<string, ILogin>({
      query: (dataLogin: ILogin) => ({
        url: `/autenticacao`,
        method: "POST",
        body: dataLogin,
      }),
    }),
  }),
});

export default authAPI;
