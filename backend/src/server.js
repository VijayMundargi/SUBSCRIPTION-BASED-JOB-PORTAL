require('dotenv').config()
const app = require("./app.js")

const connectDb = require('./config/database.js')



connectDb()
PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Sever is running on PORT ${PORT} `)
    
})