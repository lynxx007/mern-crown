import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { items: Array<{ _id: string; quantity: number; price: number }> }
    >({
      query: (body) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        body,
      }),
    }),
    getTotalAmountPaid: builder.query<
      {
        totalAll: number;
        totalByMonth: Array<{ month: string; total: number }>;
      },
      void
    >({
      query: () => ({
        url: "/payment/getAmountPaid",
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useGetTotalAmountPaidQuery } =
  paymentApiSlice;
