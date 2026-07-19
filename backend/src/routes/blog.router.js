import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBlog, getAllBlogsForAdmin } from "../controllers/blog.controller.js";

const router = Router();

router.route("/create-blog").post(
  upload.fields([{ name: "featuredImage", maxCount: 1 }]),
  verifyJWT,
  createBlog,
);
router.route("/get-user-blogs").get(verifyJWT, getAllBlogsForAdmin);

export default router;
