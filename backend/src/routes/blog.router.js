import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createBlog, getAllBlogsForAdmin, deleteBlog } from "../controllers/blog.controller.js";

const router = Router();

router.route("/create-blog").post(
  upload.fields([{ name: "featuredImage", maxCount: 1 }]),
  verifyJWT,
  createBlog,
);
router.route("/get-user-blogs").get(verifyJWT, getAllBlogsForAdmin);
router.route("/delete-blog/:blogId").delete(verifyJWT, deleteBlog);

export default router;
