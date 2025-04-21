import status from "http-status";
import { database } from "../db/index.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const userCollection = database.collection("users");

const createUser = asyncHandler(async (req, res) => {
  const userInfo = req.body;
  if (!userInfo)
    throw new ApiError(status.NOT_FOUND, "User info is required!!");

  userInfo.role = "user";
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

const UserController = { createUser };

export default UserController;
