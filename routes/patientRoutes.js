import express from "express";
import {
	createAppointment,
	getAllAppointment,
} from "../controllers/patientController.js";

const router = express.Router();

router.route("/appointments").get(getAllAppointment);
router.route("/appointment-list").post(getAllAppointment);
router.route("/appointments").post(createAppointment);

export default router;
