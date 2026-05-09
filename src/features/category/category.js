import { baseApi } from "../../utils/apiBaseQuery";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: "/category",
                method: "GET",
            }),
            providesTags: ["category"],
        }),

        createCategory: builder.mutation({
            query: (data) => ({
                url: "/category/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["category"],
        }),

        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/category/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["category"],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["category"],
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
