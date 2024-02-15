const mongoose=require('mongoose');

const movieSchema=mongoose.Schema(
    {
        movie_id:{
            type:String,
            unique:[true,"Please mention unique id for screen"],
            required:{true:"Please mention the movie id"}
        },
        movie_name:{
            type:String,
            required:{true:"Please mention the movie name"}
        },
        movie_url:{
            type:String,
            required:{true:"Please mention the movie name"}
        },
        description:{
            type:String,
            required:{true:"Please mention the movie description"}
        },
        
    },
    {
        timeStamps:true
    }
)

module.exports=mongoose.model("Movies",movieSchema);