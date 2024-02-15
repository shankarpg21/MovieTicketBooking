const mongoose=require('mongoose');
const bookingSchema=mongoose.Schema(
    {
        "user_id":{
            type:String,
            required:[true,"Please mention user id"]
        },
        "screen_id":{
            type:String,
            required:[true,"Please mention screen id"]
        },
        "show_id":{
            type:String,
            required:[true,"Please mention show id"]
        },
        "bookedSeats":{
            type:Array
        },
        "date":{
            type:String,
            required:[true,"Please mention date"]
        },
        "time":{
            type:String,
            required:[true,"Please mention time"]
        }
    },
    {
        timeStamps:true
    }
)

module.exports=mongoose.model("Bookings",bookingSchema,);