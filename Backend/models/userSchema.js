import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


function isTenDigitPhone(phone) {
    // Regular expression to match 10 digits (0-9)
    const regex = /^\d{10}$/;
    return regex.test(phone);
}
//Defining schema that how data will be stored in MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // we can also write[true,"Provide name"] it will give a message
        minLength: [3, "Name must be atleast 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: true, // required true mtlb yeh details toh honi hi honi chahiye
        validate: [validator.isEmail, "Please provide valid email"],

    },
    phone:{
        type:Number,
        required:true,
    },
    // phone: {
    //     type: String,
    //     required: true,
    //     validate: [
    //         isTenDigitPhone,
    //         "Please provide a valid 10-digit phone number",
    //     ],
    // },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain atleast 8 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"],  // enum is used so that only these values can be used   
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Hashing the password given by user
// Iss function ki explanation from chatgpt
//pre fucntion isliye ki userSchema mein value(nayi entity) save hone se phle password ko encrypt kro 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Comparing passowrd when user is trying to login
// use methods instead of method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Generation a JWT token
// Jb bhi koi user login ya register krta hai toh ek token bnake dega yeh function aur iss token ka use hm utils ki jwttoken.js file mein krenge
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

export const User = mongoose.model("User", userSchema);