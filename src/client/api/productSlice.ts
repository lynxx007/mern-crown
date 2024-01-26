import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<
      {
        success: boolean;
        msg: string;
      },
      FormData
    >({
      query: (data) => ({
        url: "/product/addProduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    searchProducts: builder.query<
      { name: string; price: number; imageUrl: string },
      string
    >({
      query: (name) => ({
        url: `/product/searchProducts?name=${name}`,
      }),
    }),
    getAllProducts: builder.query<
      { totalProducts: Array<{ info: any[] }> },
      void
    >({
      query: () => ({
        url: "/product/getAllProducts",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useSearchProductsQuery,
  useGetAllProductsQuery,
} = productApiSlice;
