import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import Container from "@mui/material/Container";
import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";
import crownLogo from "../assets/crown.svg";
import Box from "@mui/material/Box";

function Error() {
  const error = useRouteError();
  let errorStatus: number;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    if (errorStatus === 404) {
      return (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "16px", // theme.spacing(4)
            backgroundImage: `url(${crownLogo})`,
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              padding: "16px", // theme.spacing(4)
              borderRadius: (theme) => theme.shape.borderRadius,
              boxShadow: 1,
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <ErrorIcon sx={{ fontSize: { sm: 60 }, color: "gray" }} />
            <Typography variant="h4">Page not found!</Typography>
            <Button
              LinkComponent={Link}
              href="/"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                fontSize: { sm: "0.875rem" },
                padding: { sm: (theme) => theme.spacing(1) },
                backgroundColor: "black",
              }}
            >
              Go back to home
            </Button>
          </Box>
        </Container>
      );
    }
    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <ErrorIcon sx={{ fontSize: "5rem", color: "red" }} />
        <Typography variant="h4">Something went wrong!</Typography>
        <Button
          LinkComponent={Link}
          href="/"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Go back to home
        </Button>
      </Container>
    );
  }
}

export default Error;
