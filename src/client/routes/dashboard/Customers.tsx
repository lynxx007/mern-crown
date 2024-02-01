import * as React from "react";
import {
  useDeleteUserByAdminMutation,
  useDisableUserByAdminMutation,
  useGetAllUsersQuery,
} from "../../api/userApiSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { isErrorWithMsg } from "../../utils/rtkErrorHandling";
import { resetSuccess, setError, setSuccess } from "../../app/UI/uiSlice";
import DisableIcon from "@mui/icons-material/DisabledByDefault";
export default function Customers() {
  const { data, isSuccess } = useGetAllUsersQuery(undefined);
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const [isAllChecked, setIsAllChecked] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<string>("");
  const [deleteUserByAdmin] = useDeleteUserByAdminMutation();
  const [disableUserByAdmin] = useDisableUserByAdminMutation();
  const dispatch = useAppDispatch();

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const userId = useAppSelector((state) => state.auth.user);
  const handleAllCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAllChecked(e.target.checked);
    if (data) {
      const newCheckedState: Record<string, boolean> = {};
      data.users.forEach((user) => {
        newCheckedState[user._id] = e.target.checked;
      });
      setChecked(newCheckedState);
    }
  };

  const handleDeleteUsers = async (id: string) => {
    try {
      const response = await deleteUserByAdmin(id).unwrap();
      dispatch(setSuccess(response.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
      setIsDialogOpen(false);
    } catch (error) {
      if (isErrorWithMsg(error)) {
        dispatch(setError(error.data.msg));
      }
    }
  };

  const handleDisableUsers = async (id: string) => {
    try {
      const response = await disableUserByAdmin(id).unwrap();
      dispatch(setSuccess(response.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
      setIsDialogOpen(false);
    } catch (error) {
      if (isErrorWithMsg(error)) {
        dispatch(setError(error.data.msg));
      }
    }
  };

  const handleCheckboxChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked((prev) => ({ ...prev, [id]: e.target.checked }));
    };

  let content;
  if (isSuccess) {
    content = data.users.map((user, index) => (
      <TableRow
        key={user._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell sx={{ width: "5%" }}>
          {user._id !== userId?._id && (
            <Checkbox
              checked={checked[user._id] || false}
              onChange={handleCheckboxChange(user._id)}
            />
          )}
        </TableCell>
        <TableCell sx={{ width: "5%" }}>{index + 1}</TableCell>
        <TableCell component={"th"} scope={"row"}>
          {user.firstName} {user.lastName}
        </TableCell>
        <TableCell>
          <Avatar src={user.imageUrl} alt={user.username} />
        </TableCell>
        <TableCell>{user.isEmailVerified ? "Yes" : "No"}</TableCell>
        <TableCell>{user.roles.join(",")}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>{user.city}</TableCell>
        <TableCell>{user.active ? "Yes" : "No"}</TableCell>
        <TableCell sx={{ width: "5%" }}>
          {userId?._id !== user._id && userId?.roles?.includes("Admin") && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    setIsDialogOpen(true);
                    setAction("edit");
                  }}
                >
                  <EditIcon />
                  <Typography component={"span"} sx={{ ml: 1 }}>
                    Edit
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsDialogOpen(true);
                    setAction("disable");
                  }}
                >
                  <DisableIcon />
                  <Typography component={"span"} sx={{ ml: 1 }}>
                    Disable
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsDialogOpen(true);
                    setAction("delete");
                  }}
                >
                  <DeleteIcon />
                  <Typography component={"span"} sx={{ ml: 1 }}>
                    Delete
                  </Typography>
                </MenuItem>
              </Menu>
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              >
                <DialogTitle>
                  {action === "delete"
                    ? "Delete User"
                    : action === "edit"
                    ? "Edit User"
                    : "Disable User"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {action === "delete"
                      ? "Are you sure you want to delete this user?"
                      : action === "edit"
                      ? "Are you sure you want to edit this user?"
                      : "Are you sure you want to disable this user?"}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      action === "delete"
                        ? handleDeleteUsers(user._id)
                        : handleDisableUsers(user._id);
                    }}
                  >
                    Yes
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>No</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#EEE7DA" }}>
              <TableCell>
                <Checkbox
                  checked={isAllChecked}
                  onChange={handleAllCheckboxChange}
                />
              </TableCell>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Active</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{content}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
