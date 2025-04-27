import status from "http-status";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { userCollection } from "../controllers/user.controller.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err)
      throw new ApiError(
        status.UNAUTHORIZED,
        err.message || "Unauthorized Access!!"
      );

    if (decoded) {
      req.user = decoded;
      next();
    }
  });
});

const verifyEmployer = asyncHandler(async (req, _, next) => {
  const { user } = req;
  const userInfo = await userCollection.findOne({ email: user.email });

  if (userInfo.role === "employer") {
    next();
  }

  throw new ApiError(status.FORBIDDEN, "Unauthorized Access!!");
});

const verifyWorker = asyncHandler(async (req, _, next) => {
  const { user } = req;
  const userInfo = await userCollection.findOne({ email: user.email });

  if (userInfo.role === "worker") {
    next();
  }

  throw new ApiError(status.FORBIDDEN, "Unauthorized Access!!");
});

const verifyAdmin = asyncHandler(async (req, _, next) => {
  const { user } = req;
  const userInfo = await userCollection.findOne({ email: user.email });

  if (userInfo.role === "admin") {
    next();
  }

  throw new ApiError(status.FORBIDDEN, "Unauthorized Access!!");
});

const UserMiddleware = { verifyJWT, verifyEmployer, verifyWorker, verifyAdmin };

export default UserMiddleware;
