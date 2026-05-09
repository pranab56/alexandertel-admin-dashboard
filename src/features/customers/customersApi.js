import { baseApi } from "../../utils/apiBaseQuery";

export const customersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomers: builder.query({
            query: ({ page, limit }) => ({
                url: `/customer-management?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["customers"],
        }),

        singleCustomer: builder.query({
            query: (id) => ({
                url: `/customer-management/${id}`,
                method: "GET",
            }),
            providesTags: ["customers"],
        }),

        updateStatus: builder.mutation({
            query: (id) => ({
                url: `/customer-management/toggle/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["customers"],
        }),

        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customer-management/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["customers"],
        }),
    }),
});

export const {
    useGetAllCustomersQuery,
    useSingleCustomerQuery,
    useUpdateStatusMutation,
    useDeleteCustomerMutation,
} = customersApi;
