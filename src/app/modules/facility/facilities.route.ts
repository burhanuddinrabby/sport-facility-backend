import express from "express";
import { facilitiesController } from "./facilities.controller";
import { facilitiesValidations } from "./facilities.validation";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/",auth(USER_ROLE.admin),validateRequest(facilitiesValidations.createFacilitiesValidation), facilitiesController.createFacility);
// router.post("/", facilitiesController.createFacility);
router.get("/", facilitiesController.getAllFacility);
router.put("/:id", auth(USER_ROLE.admin), facilitiesController.updateFacility);
router.delete("/:id", auth(USER_ROLE.admin), facilitiesController.deleteFacility);

export const facilitiesRouter = router;