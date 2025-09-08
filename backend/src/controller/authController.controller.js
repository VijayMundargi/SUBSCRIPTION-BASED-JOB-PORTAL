const catchAsyncError = require("../middleware/catachAsyncError.js")
const ErrorHandler = require("../utils/errorHandler.js")
const User = require("../models/User.js")
const bcrypt = require("bcrypt")
const sendToken = require("../utils/sendToken.js")


// Register 
const Register = catchAsyncError(async(req,res,next)=>{

    const {name,email,number,password} = req.body;

    if(!name || !email || !number || !password) return next(new ErrorHandler("Please Enter all fieds"),409)

        let userEmail = await User.findOne({email})
        if(userEmail) return next(new ErrorHandler("User alredey existed"),409)

        let userNumber = await User.findOne({number})
        if(userNumber) return next(new ErrorHandler("Phone alredy existed"),409)

            const hashPassword = await bcrypt.hash(password,10)

        let newUser = await User.create({
            name,
            email,
            number,
            password:hashPassword,
        })
        
        sendToken(res,newUser,"Registred successfully!!!",201)
})



// Login
const Login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 409));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Email not found", 409));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("Incorrect password", 409));

  sendToken(res, user, "Welcome back", 200);
});


//Logout
const Logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,

    })
    res.status(200).json({
        sucess:true,
        message:"logged Out suceffully!!"
    })
})

//Get My profile
const profile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});


module.exports = {
    Register,
    Login,
    Logout,
    profile
}
