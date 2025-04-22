import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";

const router = Router();

router.route("/user").post(UserController.createUser);
router.route("/jwt").post(UserController.issueJWT);
router.route("/logout").post(UserController.logoutUser);
router.route("/role").get(UserMiddleware.verifyJWT, UserController.getUserRole);

export default router;
