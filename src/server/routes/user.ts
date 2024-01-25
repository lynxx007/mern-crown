import express from "express";
import checkAuth from "../middlewares/checkAuth";
import { upload } from "../config/multer";
import updateProfile from "../controllers/user/updateProfile";
import getUserProfile from "../controllers/user/getUserProfile";
import getAllUsers from "../controllers/user/getAllUsers";
import roleCheck from "../middlewares/roleCheck";
import deleteUserByAdmin from "../controllers/user/deleteUserByAdmin";
import disableUserByAdmin from "../controllers/user/disableUserByAdmin";

const router = express.Router();

router
  .route("/profile")
  .patch(checkAuth, upload.single("imageUrl"), updateProfile)
  .get(checkAuth, getUserProfile);

router.route("/getAll").get(checkAuth, getAllUsers);

router.route("/:id").delete(checkAuth, roleCheck("Admin"), deleteUserByAdmin);

router.route("/:id").patch(checkAuth, roleCheck("Admin"), disableUserByAdmin);

export default router;
