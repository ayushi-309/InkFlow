import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudnary, deleteOnCloudnary } from "../utils/cloudnary.js";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { Tag } from "../models/tag.model.js";

// Create Blog Controller
const createBlog = asyncHandler(async (req, res) => {
  let { title, content, category, tags, slug, status } = req.body;

  // Check validation
  if (!title || !content || !category || !tags || !slug || !status)
    throw new ApiError(400, "All fields are required");

  // Finding user
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  // Validating is slug already exists or not
  const existingSlug = await Blog.findOne({ slug });
  // if slug already exists, then generate new slug
  if (existingSlug) {
    slug = slug + Date.now();
  }

  // Handling Featured Image
  let featuredImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.featuredImage) &&
    req.files.featuredImage.length > 0
  ) {
    featuredImageLocalPath = req.files.featuredImage[0].path;
  }
  const featuredImage = await uploadOnCloudnary(featuredImageLocalPath);

  // Handling Tags
  let tagIds = [];
  if (tags) {
    let parsedTags;
    try {
      parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    } catch (e) {
      parsedTags = typeof tags === "string" ? tags.split(",") : [tags];
    }

    tagIds = await Promise.all(
      parsedTags.map(async (tagName) => {
        const tag = await Tag.findOneAndUpdate(
          { tagName: tagName.trim() },
          { $setOnInsert: { tagName: tagName.trim() } },
          { upsert: true, new: true },
        );
        return tag._id;
      }),
    );
  }

  // Creating Blog
  const blog = await Blog.create({
    title,
    content,
    category,
    tags: tagIds,
    slug,
    status,
    author: user._id,
    featuredImage: featuredImage?.url || "",
  });

  if (tagIds.length > 0) {
    await Tag.updateMany(
      { _id: { $in: tagIds } },
      { $push: { blogs: blog._id } },
    );
  }

  const createdBlog = await Blog.findById(blog._id);
  if (!createdBlog)
    throw new ApiError(500, "SomeThing Went Wrong While Creating Blog");

  // Returning API Response
  return res
    .status(200)
    .json(new ApiResponse(200, createdBlog, "Blog Created Successfully"));
});

// Get All Blog for Admin controller
const getAllBlogsForAdmin = asyncHandler(async (req, res) => {
  // Finding user blog and filter all blog to author id
  const blog = await Blog.find({ author: req.user._id }).populate("tags");

  if (blog) {
    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blogs Fetched Successfully"));
  }

  return res.status(200).json(new ApiResponse(200, [], "No Blogs Found"));
});

// Delete Blog controller
const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  // Validating if blog id is provided or not
  if (!blogId) throw new ApiError(400, "Blog ID is required");

  // Finding blog by id
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  // Checking authorization
  if (blog.author.toString() !== req.user._id.toString())
    throw new ApiError(401, "Unauthorized");

  // Deleting Image from Cloudinary
  if (blog.featuredImage) {
    await deleteOnCloudnary(blog.featuredImage);
  }

  // Deleting Blog
  await blog.deleteOne();

  // Removing from tag's blog array
  await Tag.updateMany(
    { _id: { $in: blog.tags } },
    { $pull: { blogs: blog._id } },
  );

  // Returning API Response
  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog deleted successfully"));
});

// Update Blog controller
const updateBlog = asyncHandler(async (req, res) => {
  let { title, content, category, tags, status } = req.body;
  const { blogId } = req.params;

  // Validating if blog id is provided or not
  if (!blogId) throw new ApiError(400, "Blog ID is required");

  // Finding blog by id
  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  // Checking authorization
  if (blog.author.toString() !== req.user._id.toString())
    throw new ApiError(401, "Unauthorized");

  // Updating
  if (title) blog.title = title.trim();
  if (content) blog.content = content.trim();
  if (category) blog.category = category.trim();
  if (status) blog.status = status.trim();
  if (tags) {
    // Updating Tag's old blog array
    await Tag.updateMany(
      { _id: { $in: blog.tags } },
      { $pull: { blogs: blog._id } },
    );

    let parsedTags;
    try {
      parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    } catch (e) {
      parsedTags = typeof tags === "string" ? tags.split(",") : [tags];
    }

    blog.tags = await Promise.all(
      parsedTags.map(async (tagName) => {
        const tag = await Tag.findOneAndUpdate(
          { tagName: tagName.trim() },
          { $setOnInsert: { tagName: tagName.trim() } },
          { upsert: true, new: true },
        );
        return tag._id;
      }),
    );

    // Adding this blog to the new tags' blogs array
    if (blog.tags && blog.tags.length > 0) {
      await Tag.updateMany(
        { _id: { $in: blog.tags } },
        { $push: { blogs: blog._id } },
      );
    }
  }

  // Updading Image
  let featuredImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.featuredImage) &&
    req.files.featuredImage.length > 0
  ) {
    featuredImageLocalPath = req.files.featuredImage[0].path;
    const featuredImage = await uploadOnCloudnary(featuredImageLocalPath);
    if (blog.featuredImage) {
      await deleteOnCloudnary(blog.featuredImage);
    }
    blog.featuredImage = featuredImage?.url || "";
  }

  // Saving all updates
  await blog.save();

  // Returning API Response
  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog updated successfully"));
});


export { createBlog, getAllBlogsForAdmin, deleteBlog, updateBlog };
