import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["Driver", "investors", "pharmacyz", "pharmacy", "zone", "otherBusiness", "zip", "Profile", "Coupon", "product", "Inventory", "category", "customers", "Repairs", "Notification", "Overview", "Services", "Shipping", "Banner", "Orders"],
});
