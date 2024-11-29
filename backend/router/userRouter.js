import express from "express";
import { addNewAdmin, login, patientRegister, getAllDoctors} from "../controller/userController.js";
import { isAdminAuthenticated,
    isAPatientAuthenticated,
 } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);

export default router;