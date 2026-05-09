import { baseApi } from "../../utils/apiBaseQuery";


export const overviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login
        overviewAnalytics: builder.query({
            query: () => ({
                url: `/overview/analytics`,
                method: "GET",
            }),
            providesTags: ["Overview"],
        }),

        overviewSales: builder.query({
            query: ({ type }) => ({
                url: `/overview/analytics/sales?type=${type}`,
                method: "GET",
            }),
            providesTags: ["Overview"],
        }),

    }),
});

// Export hooks
export const {
    useOverviewAnalyticsQuery,
    useOverviewSalesQuery
} = overviewApi;
