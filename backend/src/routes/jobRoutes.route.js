const express = require("express")
const {createJobs,getAllJob,deleteJob,getJobById,getJobsEmployer,toggleCloseJob} = require("../controller/jobController.controller")
const isAuthenticated = require("../middleware/auth.js")

const router = express.Router()

router.route("/create").post(isAuthenticated,createJobs)
router.route("/getJob").get(isAuthenticated,getAllJob)
router.route("/getSingleJob/:id").get(isAuthenticated, getJobById)
router.route("/jobsEmployer").get(isAuthenticated,getJobsEmployer)
router.route("/toggle/:id").put(isAuthenticated, toggleCloseJob);
router.route("/job/delete/:id").delete(isAuthenticated,deleteJob)

module.exports = router;
