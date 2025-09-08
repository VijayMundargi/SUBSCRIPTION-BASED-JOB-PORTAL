const express = require("express")
const {createJobs,getAllJob,deleteJob} = require("../controller/jobController.controller")


const router = express.Router()

router.route("/create").post(createJobs)
router.route("getCourse").get(getAllJob)
router.route("delte").delete(deleteJob)

module.exports = router;
