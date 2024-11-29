import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js"
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !role
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User Already Registered", 400));
    }

    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    });
    generateToken(user, "User Registered", 200, res);
});

export const login = catchAsyncErrors(async (req,res,next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Details", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email!", 400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User With This Role Not Found", 400));
    }
    generateToken(user, "User Login", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic 
)
{
    return next(new ErrorHandler("Please Fill Full Form!", 400));
}
const isRegistered = await User.findOne({ email });
if (isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
}
const admin = await User.create({
    firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "Admin",
});
res.status(200).json({
    success: true,
    message: "New Admin Registered",
});
});
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
const doctors = await User.find({ role:"Doctor" });
res.status(200).json({
    success:true,
    doctors,
});
});
