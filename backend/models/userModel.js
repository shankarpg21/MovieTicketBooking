const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
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
    },
    {
        timeStamps:true
    }
)

module.exports=mongoose.model("Users",userSchema);