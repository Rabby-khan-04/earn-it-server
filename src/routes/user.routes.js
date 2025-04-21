import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.route("/user").post(UserController.createUser);

export default router;
