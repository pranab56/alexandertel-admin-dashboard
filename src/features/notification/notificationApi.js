import { baseApi } from "../../utils/apiBaseQuery";


export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login
        allNotification: builder.query({
            query: ({ page, limit }) => ({
                url: `/notifications/admin?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Notification"],
        }),

    }),
});

// Export hooks
export const {
    useAllNotificationQuery
} = notificationApi;
