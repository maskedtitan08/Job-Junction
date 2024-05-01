import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, "Title must be at least 5 characters"],
        maxLength: [20, "Title can't exceed 20 characters"],
    },
    description: {
        type: String,
        required: true,
        maxLength: [350, "Job description in max  350 characters"],
        minLength: [50, "Description should contain at least  10 characters"],
    },
    //     company:{
    //        type: mongoose.Types.ObjectId,
    //        ref:"Company",
    //        required: [true,"Please provide a Company"]
    //    },
    // category: {
    //    type: String,
    //    enum: ["Full-Time","Part-Time","Internship"],
    // },
    category: {
        type: String,
        required: [true, "Please provide a category."],
    },
    // location:{
    //     type:String,
    //     required: [true, 'Write entire location of job'],
        
    // },
    country: {
        type: String,
        required: [true, "Please provide a country name."],
    },
    city: {
        type: String,
        required: [true, "Please provide a city name."],
    },
    location: {
        type: String,
        required: [true, "Please provide location."],
        minLength: [20, "Location must contian at least 20 characters!"],
    },
    fixedSalary: {
        type: Number,
        minLength: [5, "Salary must contain at least 5 digits"],
        maxLength: [8, "Salary cannot exceed 8 digits"],
    },
    salaryFrom: {
        type: Number,
        minLength: [5, "Salary must contain at least 5 digits"],
        maxLength: [8, "Salary cannot exceed 8 digits"],
    },
    salaryTo: {
        type: Number,
        minLength: [5, "Salary must contain at least 5 digits"],
        maxLength: [8, "Salary cannot exceed 8 digits"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
})

export const Job = mongoose.model("Job",jobSchema);