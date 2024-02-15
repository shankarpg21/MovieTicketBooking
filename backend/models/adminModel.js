const mongoose=require("mongoose");

const AdminSchema=mongoose.Schema(
    {
        email:{
            type:String,
            unique:[true,"Email should be unique"],
            required:[true,"Please add the email"]
        },
        password:{
            type:String,
            required:[true,"Please add the password"]
        }
    }  
)

module.exports=mongoose.model("Admins",AdminSchema);