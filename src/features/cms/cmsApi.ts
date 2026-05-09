import { baseApi } from "../../utils/apiBaseQuery";


export const cmsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Privacy Policy
        createPrivacyPolicy: builder.mutation({
            query: (data) => ({
                url: "/rule/privacy-policy",
                method: "POST",
                body: data,
            }),
        }),

        getPrivacyPolicy: builder.query({
            query: () => ({
                url: "/rule/privacy-policy",
                method: "GET",
            }),
        }),

        // Terms and Conditions
        createTermsAndConditions: builder.mutation({
            query: (data) => ({
                url: "/rule/terms-and-conditions",
                method: "POST",
                body: data,
            }),
        }),

        getTermsAndConditions: builder.query({
            query: () => ({
                url: "/rule/terms-and-conditions",
                method: "GET",
            }),
        }),

        // Banner Management
        createBanner: builder.mutation({
            query: (data) => ({
                url: "/banner",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Banner"],
        }),

        getBanner: builder.query({
            query: () => ({
                url: "/banner",
                method: "GET",
            }),
            providesTags: ["Banner"],
        }),

        updateBanner: builder.mutation({
            query: ({ id, data }) => ({
                url: `/banner/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Banner"],
        }),

        deleteBanner: builder.mutation({
            query: ({ id }) => ({
                url: `/banner/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Banner"],
        }),

    }),
});

// Export hooks
export const {
    useCreatePrivacyPolicyMutation,
    useGetPrivacyPolicyQuery,
    useCreateTermsAndConditionsMutation,
    useGetTermsAndConditionsQuery,
    useCreateBannerMutation,
    useGetBannerQuery,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
} = cmsApi;
