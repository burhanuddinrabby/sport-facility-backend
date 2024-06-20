import express from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "../user/user.validation";



const router = express.Router();

router.post("/signup", validateRequest(userValidations.createUserValidation), authControllers.signupController);
router.post("/login", validateRequest(userValidations.loginValidation),authControllers.loginController);

export const authRouter = router;
