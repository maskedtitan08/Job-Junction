import { Application } from "../models/applicationSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import cloudinary from "cloudinary"
import {Job} from "../models/jobSchema.js"

export const employerGetApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You cannot access this section"), 400);
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({ success: true, applications })
})

// Find the application for the job seeker
export const jobSeekerGetApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("You cannot access this section"), 400);
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({ success: true, applications })
})

//Delete the application for the job seeker
export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("You cannot access this section"), 400);
    }

    const { id } = req.params;
    const application = Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Application not found", 400));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Deleted Successfully!"
    })
})

// Yeh wala poora function ek br phrse smjhn hai
export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("You cannot access this section", 400));
    }
    if (!req.files || Object.keys(req.files).length === 0) {          // Iss if condition ka mtlb user ne frontend wale form mein resume nhi daala hai isliye req.files false hai
        return next(new ErrorHandler('Resume required', 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    if(!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler(`Invalid  file format . Please upload resume in PNG , JPG or JPEG format`, 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    if(!cloudinaryResponse ||  cloudinaryResponse.error) {
        console.log("Unknown Cloudinary error");
        return next( new ErrorHandler(`Cloudinary error ${cloudinaryResponse.error}`,500));
    }

    const {name,email,coverLetter,phone,address,jobId} = req.body;
    // Job id user se li

    // applicant ki id requesting person ke userScehma se
    const applicantID = {
        user : req.user._id,      // application hme usse milgei ki jo user request kr rha uske user schema se uski id
        role : "Job Seeker",
    }

    if(!jobId){
        return next(new ErrorHandler("No Job ID provided",400));
    }
    // Jobid se job details
    const jobDetails = await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler( 'Job NotFound'),400);
    }
    // Job Details se employer Id ki kisne post kri thi yeh job

    const employerID = {
        user : jobDetails.postedBy,
        role : "Employer",
    }

    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandler("All feilds are not filled"),400);
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume:{
            public_id: cloudinaryResponse.public_id, 
            url: cloudinaryResponse.secure_url
        },
        
    })
    res.status(200).json({
        success:true,
        message:"Application Submitted",
        application,
    });
})

