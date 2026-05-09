import { baseApi } from "../../utils/apiBaseQuery";

export const inventoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createInventory: builder.mutation({
            query: (data) => ({
                url: "/inventory",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Inventory"],
        }),

        getInventory: builder.query({
            query: ({ page, limit }) => ({
                url: `/inventory?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Inventory"],
        }),

        addStock: builder.mutation({
            query: (data) => ({
                url: `/inventory/add-stock`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Inventory"],
        }),
    }),
});
// Export hooks
export const {
    useCreateInventoryMutation,
    useGetInventoryQuery,
    useAddStockMutation,
} = inventoryApi;
