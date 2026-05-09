import { baseApi } from "../../utils/apiBaseQuery";


export const repairsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRepairs: builder.query({
            query: ({ page, limit }) => ({
                url: `/repair?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Repairs"],
        }),

        updateStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/repair/${id}/status`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Repairs"],
        }),
    }),
});

// Export hooks
export const {
    useGetAllRepairsQuery,
    useUpdateStatusMutation
} = repairsApi;
