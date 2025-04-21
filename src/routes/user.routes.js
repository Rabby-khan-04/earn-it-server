import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.route("/user").post(UserController.createUser);
router.route("/jwt").post(UserController.issueJWT);

export default router;
