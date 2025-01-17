
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import { auth } from "../common/middleware/auth.middleware";

const router = Router();

router
        .post("/", userValidator.createUser, catchError, userController.createUser)
        .post("/reset-password", userValidator.resetUserPassword, catchError, userController.resetUserPassword)
        .post("/register", userValidator.registerUser, catchError, userController.registerUser)
        .post("/login", userValidator.loginUser, catchError, userController.loginUser)
        .post("/logout", userController.logout)
        .put("/block/:userId", userController.blockUser)
        .put("/unblock/:userId", userController.unblockUser)
        .get("/date-range", userValidator.getUsersByDateRange, catchError, userController.getUsersByDateRange);
export default router;

