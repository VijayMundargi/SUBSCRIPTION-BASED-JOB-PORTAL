const mongoose = require("mongoose")

const savedSchemea = mongoose.Schema({
    jobseeker:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    job:{type:mongoose.model.Schema.Types.ObjectId, ref:"Job", required:true}
})

module.exports = mongoose.model("SavedJobs",savedSchemea)