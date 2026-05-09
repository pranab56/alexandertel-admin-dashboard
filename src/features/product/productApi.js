import { baseApi } from "../../utils/apiBaseQuery";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: ({ page, limit }) => ({
                url: `/product/admin?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["product"],
        }),

        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "product", id }],
        }),

        createProduct: builder.mutation({
            query: (formData) => ({
                url: "/product",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["product"],
        }),

        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/product/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => ["product", { type: "product", id }],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["product"],
        }),
    }),
});

export const {
    useGetAllProductQuery,
    useGetSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
