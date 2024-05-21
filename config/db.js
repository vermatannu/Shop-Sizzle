const mongoose = require("mongoose")

let MONGO_URL = "mongodb://127.0.0.1:27017/shopsizzle"
async function connectDB(){
    try{
        await mongoose.connect(MONGO_URL)
        console.log("connect to db")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB;