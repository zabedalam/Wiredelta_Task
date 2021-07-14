const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail=require('../utils/sendEmail')

// Register a user   => /api/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "products/airpords_e5cqqr",
      url: "https://res.cloudinary.com/bookit/image/upload/v1606231282/products/airpords_e5cqqr.jpg"
    }
  });

  sendToken(user, 200, res);
});

// Login User  =>  /api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//Forgot Password =>/api/password/forgot
exports.forgotPassword=catchAsyncErrors(async (req,res,next)=>{
  const user=await User.findOne({email:req.body.email})

  if(!user){
    return next(new ErrorHandler('User not found with this email',404))
  }

  const resetToken=user.getResetPasswordToken()

  await user.save({validateBeforeSave:false})

  //Create reset password url
  const resetUrl=`${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
  const message=`Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email  then ignore it.`

  try{
    await sendEmail({
      email:user.email,
      subject:'e-Shop Password Recovery',
      message
    })

    res.status(200).json({
      success:true,
      message:`Email sent to:${user.email}`
    })

  }catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save({validateBeforeSave:false})
    return next(new ErrorHandler(error.message,500))
  }


})

// Logout user   =>   /api/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: "Logged out"
  });
});
