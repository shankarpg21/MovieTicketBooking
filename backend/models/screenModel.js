const mongoose=require('mongoose')

const screenSchema=mongoose.Schema({
    screen_id:{
        type:String,
        required:{true:"Please mention the screen id"},
        unique:{true:"Screen id already exists,please mention unique screen id"}
    },
    no_of_seats:{
        type:Number,
        required:{true:"Please mention the number of seats available in the screen"},
    }
},
{
    timeStamps:true
})

module.exports=mongoose.model("Screens",screenSchema)