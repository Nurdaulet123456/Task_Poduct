import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),

  tagTypes: ["Products", "Filters", "Cityes"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: (result = [], error, arg) => [
        "Products",
        ...result.map(({ id }) => ({ type: "Products", id })),
      ],
    }),

    createProduct: builder.mutation({
      query: (products) => ({
        url: "/products",
        method: "POST",
        body: products,
      }),

      invalidatesTags: ["Products"],
    }),

    getFilters: builder.query({
      query: () => "/filters",
      providesTags: ["Filters"],
    }),

    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Products"],
    }),

    getCitys: builder.query({
      query: () => "/cityes",
      providesTags: ["Cityes"],
    }),

    editProducts: builder.mutation({
      query: ({ id, ...args }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: args,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetFiltersQuery,
  useDeleteProductsMutation,
  useGetCitysQuery,
  useEditProductsMutation,
} = apiSlice;
