import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../middlewares/errorMiddleware";
import { Appointment } from "../models/appointmentSchema";
import { User } from "../models/userSchema";

export const postAppointment = catchAsyncErrors(async(req,res,next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
      } = req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
      ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }
      const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
      });
      if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found!", 400));
      }
      if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctors Conflict! Please Contact Thrpugh Email or Phone!", 400));
      }

      const doctorId = isConflict[0]._id;
      const patientId = req.user._id;
      const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId
      });
      res.status(200).json({
        success: true,
        message: "Appointment Sent Successfully",
      });
});