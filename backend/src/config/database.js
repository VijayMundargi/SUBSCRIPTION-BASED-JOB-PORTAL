const mongoose = require('mongoose')
const catchAsyncError = require('../middleware/catachAsyncError')

const connectDb = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Databse connected succefully!!!`)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = connectDb