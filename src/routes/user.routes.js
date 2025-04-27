import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";

const router = Router();

router.route("/user").post(UserController.createUser);
router.route("/jwt").post(UserController.issueJWT);
router.route("/logout").post(UserController.logoutUser);
router
  .route("/role/employer")
  .get(
    UserMiddleware.verifyJWT,
    UserMiddleware.verifyEmployer,
    UserController.getUserRole
  );

router
  .route("/role/worker")
  .get(
    UserMiddleware.verifyJWT,
    UserMiddleware.verifyWorker,
    UserController.getUserRole
  );

router
  .route("/role/admin")
  .get(
    UserMiddleware.verifyJWT,
    UserMiddleware.verifyAdmin,
    UserController.getUserRole
  );

export default router;
