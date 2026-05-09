import { baseApi } from "../../utils/apiBaseQuery";


export const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login
        allOrders: builder.query({
            query: ({ page, limit }) => ({
                url: `/billing/admin-billing?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),

        singleOrders: builder.query({
            query: (id) => ({
                url: `/billing/${id}`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),

    }),
});

// Export hooks
export const {
    useAllOrdersQuery,
    useSingleOrdersQuery
} = ordersApi;
