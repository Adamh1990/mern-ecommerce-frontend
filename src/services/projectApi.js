import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//create api

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
        //create product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),
    }),
});

export const { useSignupMutation, useLoginMutation, useCreateProductMutation } = projectApi;

export default projectApi;