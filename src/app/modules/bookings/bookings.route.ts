import express  from "express";
import { bookingControllers } from "./bookings.controller";
import { bookingValidations } from "./bookings.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router()

router.post("/",auth(USER_ROLE.user),validateRequest(bookingValidations.createBookingValidation),bookingControllers.createBookingController)
router.get("/",auth(USER_ROLE.admin),bookingControllers.getAllBookingController)
router.get("/user",auth(USER_ROLE.user),bookingControllers.getSingleBookingController)
router.delete("/:id",auth(USER_ROLE.user),bookingControllers.deleteBookingController)


export const bookingRoute = router