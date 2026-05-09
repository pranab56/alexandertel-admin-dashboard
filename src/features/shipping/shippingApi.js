import { baseApi } from "../../utils/apiBaseQuery";


export const shippingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createShipping: builder.mutation({
            query: (data) => ({
                url: `/shipping`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Shipping"],
        }),

        getAllShipping: builder.query({
            query: () => ({
                url: `/shipping`,
                method: "GET",
            }),
            providesTags: ["Shipping"],
        }),

        deleteShipping: builder.mutation({
            query: ({ id }) => ({
                url: `/shipping/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Shipping"],
        }),
    }),
});

// Export hooks
export const {
    useGetAllShippingQuery,
    useCreateShippingMutation,
    useDeleteShippingMutation
} = shippingApi;
