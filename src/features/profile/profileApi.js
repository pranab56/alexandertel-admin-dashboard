import { baseApi } from "../../utils/apiBaseQuery";


export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/user",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),

        getProfile: builder.query({
            query: () => ({
                url: "/user/profile",
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                body: data,
            }),
        }),

    }),
});

// Export hooks
export const {
    useUpdateProfileMutation,
    useGetProfileQuery,
    useChangePasswordMutation,
} = profileApi;
