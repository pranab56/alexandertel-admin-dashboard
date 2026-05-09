import { baseApi } from "../../utils/apiBaseQuery";


export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: () => ({
                url: `/service`,
                method: "GET",
            }),
            providesTags: ["Services"],
        }),

        createServices: builder.mutation({
            query: (data) => ({
                url: `/service`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Services"],
        }),

        deleteServices: builder.mutation({
            query: ({ id }) => ({
                url: `/service/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Services"],
        }),
    }),
});

// Export hooks
export const {
    useGetAllServicesQuery,
    useCreateServicesMutation,
    useDeleteServicesMutation
} = servicesApi;
