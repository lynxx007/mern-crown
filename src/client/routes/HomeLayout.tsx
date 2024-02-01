import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "../hooks/reduxHooks";

function HomeLayout() {
  const success = useAppSelector((state) => state.ui.success);
  const msg = useAppSelector((state) => state.ui.msg);
  const status = useAppSelector((state) => state.ui.status);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component={"main"} sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      {success && ( // Only render when status is true
        <Box sx={{ flexGrow: 0 }}>
          <Snackbar
            open={success} // Pass the status as the open prop
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert variant="filled" severity={status}>
              {msg}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Box>
  );
}

export default HomeLayout;
