import express from "express";
import { getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isAPatientAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/post", isAPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);

export default router;
