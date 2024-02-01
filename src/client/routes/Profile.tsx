import useTitle from "../hooks/useTitle";
import Navigation from "../views/Navigation";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Footer from "../views/Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Avatar from "@mui/material/Avatar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import Input from "@mui/material/Input";

import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUpdateProfileMutation } from "../api/userApiSlice";
import {
  resetError,
  resetSuccess,
  setError,
  setSuccess,
} from "../app/UI/uiSlice";
import { deleteImage, update } from "../app/auth/authSlice";
import { isErrorWithMsg } from "../utils/rtkErrorHandling";
const city = [
  "Jakarta",
  "Medan",
  "Surabaya",
  "Bandung",
  "Pekanbaru",
  "Manado",
  "Balikpapan",
  "Bali",
];
const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .nullable(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .nullable(),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long" })
    .nullable(),
  selectedCity: z
    .string()
    .refine((value) => city.includes(value), {
      message: "City not found",
    })
    .nullable(),
});

type FormData = z.infer<typeof schema>;

const Profile = () => {
  useTitle("Profile | CROWN");
  const selectUser = useAppSelector((state) => state.auth.user);
  const [selectedImage, setSelectedImage] = useState<File | string>("");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: selectUser?.address || undefined,
      firstName: selectUser?.firstName || undefined,
      lastName: selectUser?.lastName || undefined,
      selectedCity: selectUser?.city || undefined,
    },
  });

  const handleImageChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };
  const handleDeleteImage = (e: any) => {
    e.stopPropagation();
    dispatch(deleteImage(undefined));
    setSelectedImage("");
  };
  const handleSaveChanges: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName || "");
      formData.append("lastName", data.lastName || "");
      formData.append("address", data.address || "");
      formData.append("city", data.selectedCity || "");

      if (selectedImage) {
        formData.append("imageUrl", selectedImage || "");
      }

      const response = await updateProfile(formData).unwrap();

      dispatch(update(response));
      dispatch(setSuccess(response?.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
    } catch (error) {
      if (isErrorWithMsg(error)) {
        dispatch(setError(error.data.msg));
        setTimeout(() => dispatch(resetError(undefined)), 5000);
      }
    }
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="xs" component={"main"}>
        <Box
          sx={{
            mt: 8,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0px 0px 10px 0px #000000",
          }}
          component={"form"}
          noValidate
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleSaveChanges)}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            User Profile
          </Typography>

          <Badge
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              <div>
                <Input
                  type="file"
                  sx={{ display: "none" }}
                  onChange={handleImageChanges}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <EditIcon
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                </label>
                {selectUser?.imageUrl && (
                  <DeleteIcon
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={handleDeleteImage}
                  />
                )}
              </div>
            }
          >
            <Avatar
              src={selectUser?.imageUrl}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          </Badge>

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                error={Boolean(errors.firstName)}
                color="primary"
                focused
                size="small"
                onBlur={() => clearErrors("firstName")}
                helperText={errors.firstName?.message}
                sx={{ marginBottom: 2, width: "100%" }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Last Name"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                color="primary"
                focused
                size="small"
                onBlur={() => clearErrors("lastName")}
                sx={{ marginBottom: 2, width: "100%" }}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Address"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                color="primary"
                focused
                size="small"
                onBlur={() => clearErrors("address")}
                sx={{ marginBottom: 2, width: "100%" }}
              />
            )}
          />
          <Controller
            name="selectedCity"
            control={control}
            render={({ field }) => (
              <>
                <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                  <InputLabel sx={{}} id="City">
                    City
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="City"
                    variant="outlined"
                    error={Boolean(errors.selectedCity)}
                    size="medium"
                    margin="dense"
                  >
                    {city.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.selectedCity?.message}
                  </FormHelperText>
                </FormControl>
              </>
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default Profile;
