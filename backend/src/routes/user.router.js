import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile,
  updateUserDetails,
} from "../controllers/user.controller.js";

const router = Router();

// User Routes.
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router
  .route("/update-profile")
  .patch(
    verifyJWT,
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    updateProfile,
  );
router.route("/update-details").patch(verifyJWT, updateUserDetails);

export default router;
