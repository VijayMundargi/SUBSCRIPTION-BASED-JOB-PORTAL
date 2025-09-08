const cachAsyncError = require("../middleware/catachAsyncError")
const ErrorHandler = require("../utils/errorHandler")
const Jobs = require("../models/Job")

const createJobs = cachAsyncError(async(req,res,next)=>{
    const {title,description,company,location,salary,jobType} = req.body;
    
})


const getAllJob = cachAsyncError(async(req,res,next)=>{

})


const deleteJob = cachAsyncError(async(req,res,next)=>{

})

module.exports = {
    createJobs,
    getAllJob,
    deleteJob
}
