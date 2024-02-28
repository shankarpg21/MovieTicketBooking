const asyncHandler=require("express-async-handler");
const mongoose=require('mongoose');

const conn=async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");
    }
    catch(e){
        console.log(e);
    }
}

module.exports=conn