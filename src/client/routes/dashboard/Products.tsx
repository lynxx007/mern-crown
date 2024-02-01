import { useGetShopDataQuery } from "../../api/apiSlice";
import Spinner from "../../components/Spinner";
import Error from "../Error";
import NewProductCards from "../../components/NewProductCards";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import * as React from "react";
import ImageIcon from "@mui/icons-material/Image";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import * as z from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiFileInput } from "mui-file-input";
import { useAddProductMutation } from "../../api/productSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  resetError,
  resetSuccess,
  setError,
  setSuccess,
} from "../../app/UI/uiSlice";
import { isErrorWithMsg } from "../../utils/rtkErrorHandling";
import SearchBar from "../../components/SearchBar";

const categories = ["Jackets", "Sneakers", "Hats", "Womens", "Mens"];

const schema = z.object({
  category: z.string().refine((value) => categories.includes(value), {
    message: "Category not found",
  }),
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters long",
  }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  image: z.any(),
});

type FormData = z.infer<typeof schema>;

const Products = () => {
  const [query, setQuery] = React.useState<string>("");
  const { data, isLoading, isError, isSuccess } = useGetShopDataQuery();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [addProduct, { isLoading: addProductIsLoading }] =
    useAddProductMutation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      category: "",
      productName: "",
      price: 0,
      image: undefined,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("name", data.productName);
      formData.append("price", data.price.toString());
      formData.append("image", data.image);

      const response = await addProduct(formData).unwrap();
      dispatch(setSuccess(response.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
    } catch (error) {
      if (isErrorWithMsg(error)) {
        dispatch(setError(error.data.msg));
        setTimeout(() => dispatch(resetError(undefined)), 5000);
      }
    }
  };

  let content;
  if (isLoading) content = <Spinner />;
  else if (isError) content = <Error />;
  else if (isSuccess) {
    console.log(data);

    content = data.map((items) => {
      const { info } = items;

      return (
        <Grid item key={items._id} xs={6} sm={6} md={4} lg={3}>
          <Typography variant="h6" sx={{ mb: 2 }} align="center">
            {items.category}
          </Typography>
          {info.map((item) => (
            <NewProductCards key={item._id} items={item} />
          ))}
        </Grid>
      );
    });
  }

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }} align="center">
          Products
        </Typography>
        <IconButton sx={{ mb: 2 }} onClick={() => setOpenDialog(true)}>
          <AddIcon />
          <Typography variant="subtitle1">Add Product</Typography>
        </IconButton>
        <Box display="flex" justifyContent="flex-end" position="relative">
          <SearchBar query={query} onQueryChange={setQuery} />
        </Box>

        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} columns={16} justifyContent={"center"}>
          {content}
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ textAlign: "center" }}>Add Product</DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <Controller
              name="category"
              control={control}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <Box sx={{ mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={value}
                      label="Category"
                      onChange={onChange}
                      error={Boolean(error)}
                      onBlur={onBlur}
                      required
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
            />
            <Controller
              name="productName"
              control={control}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    name="productName"
                    autoFocus
                    margin="dense"
                    label="Product Name"
                    type="text"
                    fullWidth
                    required
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {error?.message ?? ""}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl sx={{ width: "100%" }}>
                  <TextField
                    name="price"
                    autoFocus
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    required
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onBlur={field.onBlur}
                    error={Boolean(fieldState.error)}
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {fieldState.error?.message ?? ""}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <MuiFileInput
                  {...field}
                  title="Input Image Product"
                  label="Image Product"
                  sx={{ mt: 2, width: "25%" }}
                  size="small"
                  required
                  InputProps={{
                    inputProps: {
                      accept: "image/*",
                    },
                    startAdornment: <ImageIcon />,
                  }}
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              disabled={addProductIsLoading}
            >
              Add
            </Button>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const ProductsMemoized = React.memo(Products);
export default ProductsMemoized;
