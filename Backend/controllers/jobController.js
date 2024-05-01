import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Job } from "../models/jobSchema.js"

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false }); // Job Schema se wo saari job find kro jinka expire = false hai;
    // yeh res status na json ki form data ko dikha deta hai jo bhin hm schema se fetch krte hain aur jo json k andar dikhti hain wo hm define krte hain ki kya kya dekhna hai jaise success varibale dekhna hai aur jobs ka array dekhna hai
    res.status(200).json({
        success: true,
        jobs,
    })
})

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;  // yeh req.user hmare pss auth.js js aa rha hai aur yeh auth.js hmare jobrouter mein import hua hai
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You cannot  post job as you are a Job seeker"));
    }
    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler('Please provide all fields', 400));
    }
    if (!fixedSalary && (!salaryFrom || !salaryTo)) {
        return next(new ErrorHandler(("Provide valid salary details"), 400));
    }
    if (fixedSalary && (salaryFrom && salaryTo)) {
        return next(new ErrorHandler(("Provide only one type of Salary"), 400));
    }

    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
    })
    res.status(200).json({
        success: true,
        message: "Job posted successfully",
        job,
    })
})

export const getmyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You cannot access this section"), 400);
    }
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myJobs,
    });
})

export const updateJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You cannot access this section"), 400);
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler('No job found with the given id', 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true, //return updated doc instaed of original one
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        message: "Job has been updated!",
        job,

    })
})

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("You cannot access this section"), 400);
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler('No job found with the given id', 400));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted Successfully",
    })
})

export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler(`No job found for ID ${id}`, 400));
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        return  next (new ErrorHandler(error));
    }
})
