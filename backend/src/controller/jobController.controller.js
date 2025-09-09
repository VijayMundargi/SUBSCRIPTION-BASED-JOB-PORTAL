const cachAsyncError = require("../middleware/catachAsyncError")
const ErrorHandler = require("../utils/errorHandler")
const Jobs = require("../models/Job")



// Create a Jos
const createJobs = cachAsyncError(async (req, res, next) => {
    const { title, description, company, location, salaryMin, salaryMax, type, requirements, category } = req.body;

    // Check if all fields are provided
    if (!title || !description || !company || !location || !salaryMin || !salaryMax || !type || !requirements || !category) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    // Create the job
    const job = await Jobs.create({
        title,
        description,
        company,
        location,
        salaryMin,
        salaryMax,
        type,
        requirements,
        category
    });

    // Send a response
    res.status(201).json({
        success: true,
        message: "Job created successfully",
        job
    });
});



// Get all Jobs
const getAllJob = cachAsyncError(async(req,res,next)=>{
    const jobs = await Jobs.find()
    res.status(201).json({
        success:true,
        jobs
    })
})


// Delete a Jobs
const deleteJob = cachAsyncError(async (req, res, next) => {
    const job = await Jobs.findById(req.params.id);

    if (!job) return next(new ErrorHandler("Job not found", 404));

   await Jobs.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Job deleted successfully"
    });
});


//  Toggole Job Closed/Open
const toggleCloseJob = cachAsyncError(async(req,res,next)=>{

    const job = await Jobs.findById(req.params.id)
    if(!job) return next(new ErrorHandler("Job not found"),404)

    job.isClosed = !job.isClosed
    job.save()
    
    res.status(200).json({
        sucess:true,
        job
    })

})


// Get a single Job
const getJobById = cachAsyncError(async(req,res,next)=>{
        const job = await Jobs.findById(req.params.id)
    .select("title description company location salaryMin salaryMax type requirements category isClosed createdAt updatedAt") // select only the fields you want
    .populate("company", "name email"); // populate company info

  if (!job) return next(new ErrorHandler("Job not found"),404);

  res.status(200).json({
    success: true,
    job,
  });

})



// Get Jobs Employer
const getJobsEmployer = cachAsyncError(async(req,res,next)=>{
    
})




module.exports = {
    createJobs,
    getAllJob,
    getJobById,
    deleteJob,
    toggleCloseJob,
    getJobsEmployer,
}
