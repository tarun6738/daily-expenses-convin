const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const { sendToken } = require("../utils/jwtToken");


// create user

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    mobile
  });

  sendToken(user, 201, res);
});

// login user

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Email or Password", 401));

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid Email or Password", 401));

  sendToken(user, 200, res);
});

// logout user

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// get one user details by id

const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler(`User doesnot exists with ${req.params.id}`, 400)
    );
  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getSingleUser,
};
