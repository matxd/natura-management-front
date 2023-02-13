import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IParamsGet, IPostUser, IPutUser, IUsers } from "../../utils/interface";

const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) { headers.set('authorization', token); }
      return headers;
    }
  }),
  tagTypes: ['users'],
  endpoints: (builder) => ({
    getUser: builder.query<IUsers, IParamsGet>({
      query: (params: IParamsGet) => 
        `/usuario/listar?size=${params.size}&page=${params.page}${params.filter ? `&name=${params.filter}` : ''}`,
        providesTags: ['users']
    }),
    postUser: builder.mutation<{ message: string }, FormData | IPostUser>({
      query: (user: IPostUser) => ({
        url: `/usuario/cadastrar`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['users']
    }),
    putUser: builder.mutation<{ message: string }, any>({
      query: (userParams: IPutUser) => ({
        url: `/usuario/atualizar/${userParams.id}`,
        method: 'PUT',
        body: userParams.body
      }),
      invalidatesTags: ['users']
    }),    
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (idUser: string) => ({
        url: `/usuario/delete/${idUser}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['users']
    }),
  })
});

export default userAPI;