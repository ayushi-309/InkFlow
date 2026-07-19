import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudnary } from "../utils/cloudnary.js";

// Methode to Generate Access Token and Refresh Token.
const generrateToken = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "SomeThing Went Wrong While Generating Access and Rreferesh Token",
    );
  }
};

// Register User Controller
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // Validating is fullname email and password coming properly or not
  if (!fullname || !email || !password)
    throw new ApiError(400, "All fields are required");

  // Validating is user already exists or not
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  // Reciving Avatar File
  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  // Uploading them to Cloudinary if avatarLocalPath exists.
  const avatarImage = await uploadOnCloudnary(avatarLocalPath);

  // Creating user in DB
  const user = await User.create({
    fullname,
    email,
    password,
    avatar: avatarImage?.url || "default.jpg",
  });

  // Generating Token.
  const { accessToken, refreshToken } = await generrateToken(user._id);

  // Setting Cookie.
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Removing Password and Refresh Token field from response.
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(503, "SomeThing Went Wrong While Creating User");
  }

  // Returning API Response.
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

// Login User Controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validating is email and password coming properly or not
  if (!email || !password) throw new ApiError(400, "All fields are required");

  // Validating is user exists or not
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // Checking is password correct or not
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid password");

  // Generating Token.
  const { accessToken, refreshToken } = await generrateToken(user._id);

  // Setting Cookie.
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Removing Password and Refresh Token field from response.
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!loggedInUser) {
    throw new ApiError(503, "SomeThing Went Wrong While Logging In");
  }

  // Returning API Response.
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User Logged In Successfully"));
});

// Logout User Controller
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

// Get Current User Controller.
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );

  // Validating is user exists or not
  if (!user) throw new ApiError(404, "User not found");

  // Returning API Response.
  return res.status(200).json(new ApiResponse(200, user, "User"));
});

// Update User Profile Controller.
const updateProfile = asyncHandler(async (req, res) => {
  let localFilePath;

  // Checking if avatar is coming properly or not.
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    localFilePath = req.files.avatar[0].path;
  }

  // Uploading avatar on Cloudnary if exists.
  const avatarImage = await uploadOnCloudnary(localFilePath);

  // Validating is user exists or not
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  // Updating avatar if exists.
  if (avatarImage?.url) user.avatar = avatarImage?.url;
  await user.save({ validateBeforeSave: false });

  const updatedUser = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );

  // Returning API Response.
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User Profile Updated Successfully"),
    );
});

// Update User details Controller.
const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullname, bio } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  if (fullname) user.fullname = fullname;
  if (bio) user.bio = bio;

  await user.save({ validateBeforeSave: false });

  const updatedUser = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );

  // Returning API Response.
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User Details Updated Successfully"),
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile,
  updateUserDetails,
};
