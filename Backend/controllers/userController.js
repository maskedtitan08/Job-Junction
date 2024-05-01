import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";



export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,role,password} = req.body;   //de-structered the req.body 
    
    if(!name ||!email|| !phone || !password || !role){
        return next(new ErrorHandler("Fill full form",400));
    }
    //check if user already exists
    const emailExist = await User.findOne({email});
    if(emailExist)  
      return next(new ErrorHandler("Email is already in use"));

    const user = await User.create({
        name,email,phone,role,password,
    });
    
    sendToken(user,200,res,"User registered");//send token with the response and set
})

export const login = catchAsyncError(async (req,res,next) =>{
    const  {email, password,role} = req.body; // yeh values hme wahan se milegi jb user login page pr details daal rha hoga

    if( !email || !password || !role ){
        return next( new ErrorHandler('Fill complete details', 400))
    }
    // Iss user mein wo schema se saari details nikal lega email k through
    const user = await User.findOne({email}).select("+password") ;
    if(!user){
        return next(new ErrorHandler("Incorrect Credentials",400));
    }
    // Check password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched ) {
        return next(new ErrorHandler("Incorrect Credentials",400));
    }
    if(user.role!==role){
        return next (new  ErrorHandler("No user found for this role",400))
    }

    sendToken(user,200,res,"Logged In Successfully");

})

export const logout = catchAsyncError(async(req, res, next)=>{
    // token uss cookie ka naam hai jo user k pss save hui hai login krte time
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires :  new Date(Date.now()),
    }).json({
        success : true ,
        message :"logged out successfully!"
    })
})

export const getUser = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})