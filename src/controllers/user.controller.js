import status from "http-status";
import { database } from "../db/index.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../constants.js";

export const userCollection = database.collection("users");

const createUser = asyncHandler(async (req, res) => {
  const userInfo = req.body;
  if (!userInfo)
    throw new ApiError(status.NOT_FOUND, "User info is required!!");

  userInfo.satisfied_rate = 0;
  userInfo.completed_tasks = 0;
  userInfo.completation_rate = 0;
  userInfo.work_score = 0;
  userInfo.balance = 0;
  userInfo.avgOnlineHours = 0;
  userInfo.earned = 0;
  userInfo.status = "active";
  const existedUser = await userCollection.findOne({ email: userInfo.email });
  if (existedUser)
    throw new ApiError(
      status.CONFLICT,
      "User with this email already exists!!"
    );

  const result = await userCollection.insertOne(userInfo);

  return res
    .status(status.CREATED)
    .json(new ApiResponse(status.OK, result, "User registered successfully!!"));
});

const issueJWT = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(status.BAD_REQUEST, "Invalid credentials!!");

  const user = await userCollection.findOne({ email });
  if (!user) throw new ApiError(status.UNAUTHORIZED, "Unauthorized Access!!");

  const payload = {
    id: user._id,
    email: user.email,
    uid: user.uid,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_SECRET,
  });

  return res
    .status(status.OK)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(status.OK, { token }, "Authentication successful!!"));
});

const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(status.OK)
    .clearCookie("token", cookieOptions)
    .json(
      new ApiResponse(status.OK, { success: true }, "Logged out successfully!!")
    );
});

const UserController = { createUser, issueJWT, logoutUser };

export default UserController;
