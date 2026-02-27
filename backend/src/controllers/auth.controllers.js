import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiRes.utils.js";
import { validationResult } from "express-validator";

const registerUser = asyncHandler(async (req, res) => {
  console.log('this is a controller of register controllers');
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(new ApiError(400, "Validation Error", errors.array()));
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }
  console.log('existing user',existingUser);
  const user = await User.create({ name, email, password });
  console.log('user',user);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  console.log(accessToken,refreshToken);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  console.log('created user',createdUser);
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, accessToken },
        "User registered successfully",
        true,
      ),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  console.log('this is a controller of login user');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { email, password } = req.body;
console.log(req.body);
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User with this email does not exist");
  }
  console.log('user',user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect password");
  }
  console.log('ispasswordcorrect',isPasswordCorrect);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
console.log(accessToken,refreshToken);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  console.log('loggeduser',loggedInUser);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged in successfully",
        true,
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  console.log('this is logout');
  // 1️⃣ Remove refresh token from DB
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

  // 2️⃣ Clear cookies (use same options as when setting)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Current user fetched successfully", true));
});

export const getAllUsersAdmin = asyncHandler(async (req, res) => {

  // 🔒 Only admin allowed
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  const users = await User.find({})
    .select("-password -refreshToken") // never expose sensitive fields
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      users,
      "Users fetched successfully",
      true
    )
  );
});
export const deleteUserAdmin = asyncHandler(async (req, res) => {
  console.log('this is a delete user');
  // 🔒 Only admin allowed
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  const { id } = req.params;

  // 🚫 Prevent admin from deleting themselves
  if (req.user._id.toString() === id) {
    throw new ApiError(400, "You cannot delete yourself.");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  await User.findByIdAndDelete(id);
  console.log(user);
  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "User deleted successfully",
      true
    )
  );
});

export { registerUser, loginUser, logoutUser ,getCurrentUser};
