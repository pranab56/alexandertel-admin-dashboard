import { baseApi } from "../../utils/apiBaseQuery";

export const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCoupon: builder.mutation({
            query: (data) => ({
                url: "/coupon",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Coupon"],
        }),
        getAllCoupons: builder.query({
            query: () => ({
                url: "/coupon",
                method: "GET",
            }),
            providesTags: ["Coupon"],
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupon/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Coupon"],
        }),
    }),
});
// Export hooks
export const {
    useCreateCouponMutation,
    useGetAllCouponsQuery,
    useDeleteCouponMutation,
} = couponApi;
