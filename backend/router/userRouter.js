import express from "express";
import { addNewAdmin, login, patientRegister, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor} from "../controller/userController.js";
import { isAdminAuthenticated,
    isAPatientAuthenticated,
 } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isAPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isAPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);


export default router;
