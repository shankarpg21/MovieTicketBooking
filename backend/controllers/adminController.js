const asyncHandler=require('express-async-handler');
const Admin=require('../models/adminModel');
const Shows=require('../models/showModel');
const Movies=require('../models/movieModel');
const jwt=require('jsonwebtoken')
const Screens=require('../models/screenModel')
const Bookings=require('../models/bookingModel');

const login=asyncHandler(async(req,res)=>{
    try{
        const {email,password}=req.body;
        const chk=await Admin.findOne({"email":email});
        if(chk && chk.password==password){
            const accessToken=jwt.sign({
                user:email
            },process.env.ACCESS_TOKEN_ADMIN);
            return res.status(200).send({accessToken,email});
        }
        else{ 
            res.status(400).send("Invalid credentials");
        }
    }
    catch(e){
        res.status(400).json(e);
    }
})

const addScreen=asyncHandler(async(req,res)=>{ 
    const {screen_id,no_of_seats}=req.body;
    if(!screen_id||!no_of_seats){
        return res.status(400).send("All fields are mandatory")
    }
    try{
        await Screens.create({"screen_id":screen_id,"no_of_seats":no_of_seats})
        res.status(200).send("Screen added succesfully")
    }
    catch(e){
        res.status(400).send({e})
    }
})


const addMovie=asyncHandler(async(req,res)=>{ 
    const {movie_id,movie_name,description,movie_url}=req.body;
    try{
        if(!movie_id||!movie_name||!description||!movie_url){
            return res.status(400).send("All fields are mandatory");
        }
        await Movies.create({"movie_id":movie_id,"movie_name":movie_name,"movie_url":movie_url,"description":description});
        res.status(200).send("Movie Details added successfully");
    }
    catch(e){
        res.status(400).json({e});
    }
    
})

const addShows=asyncHandler(async(req,res)=>{ 
    const movie_id=req.params.movie_id
    const {show_id,screen_id,date,time,price}=req.body;
    try{
        if(!show_id||!screen_id||!movie_id||!date||!time||!price){
            return res.status(401).send("All fields are mandatory");
        }
        const chk_movie=await Movies.findOne({"movie_id":movie_id});
        if(!chk_movie){
            return res.status(409).send("Movie id does'nt exists");
        }
        const chk_screen=await Screens.findOne({"screen_id":screen_id});
        if(!chk_screen){
            return res.status(409).send("Screen id does'nt exists");
        }
        const flag=await Shows.find({$and:[{"screen_id":screen_id,"date":new Date(date),"time":time}]});
        if(flag.length>0){
            return res.status(409).send(`Screen with id${screen_id} already scheduled on that given date and time`)
        }
        var seats=new Array(chk_screen.no_of_seats);
        seats.fill(0);
        await Shows.create({"show_id":show_id,"screen_id":screen_id,"movie_id":movie_id,"movie_name":chk_movie.movie_name,"no_of_seats":chk_screen.no_of_seats,"seats":seats,"date":date,"time":time,"price":price});
        res.status(200).send("Details added successfully");
    }
    catch(e){
        res.status(400).json({e});
    }
})

const getShows=asyncHandler(async(req,res)=>{ 
    try{
        const msg=await Movies.aggregate([
            {
                $lookup:{
                    from:"shows",
                    localField:"movie_id",
                    foreignField:"movie_id",
                    as:'showDetails'
                }
            },
            {$unwind:`$showDetails`},
            {$match: {
                "showDetails.date": { $gte: new Date() } 
            }},
           {$group: {
            _id: "$_id", 
            movie_id: { $first: "$movie_id" },
            movie_name:{$first:"$movie_name"},
            movie_url:{$first:"$movie_url"},
            description:{$first:"$description"}
        }}
        ]);
        res.status(200).send(msg)
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

const getMovies=asyncHandler(async(req,res)=>{
    try{
        const msg=await Movies.find({})
        res.status(200).send(msg);
    }
    catch(e){
        res.status(400).send(e)
    }
})

const viewTicket=asyncHandler(async(req,res)=>{ 
    try{
        const show_id=req.params.show_id;
        if(!show_id){
            return res.status(400).send("Mention show id");
        }
        const msg=await Bookings.aggregate([
            {$match:{'show_id':show_id}},
          {$lookup:{
            localField:'show_id',
            foreignField:'show_id',
            from:'shows',
            as:'showDetails'
          }},
          {$unwind:`$showDetails`},
          {
            $lookup:{
                localField:'movie_id',
                foreignField:'showDetails.movie_id',
                from:'movies',
                as:'movieDetails'
            }
          },{
            $unwind:`$movieDetails`
          },
          {$group:{
            '_id':"$_id",
            show_id:{$first:`$show_id`},
            user_id:{$first:`$user_id`},
            screen_id:{$first:`$showDetails.screen_id`},
            movie_name:{$first:'$movieDetails.movie_name'},
            bookedSeats:{$first:'$bookedSeats'},
            date:{$first:'$date'},
            time:{$first:'$time'}
          }}
        ])
       
        res.status(200).json(msg)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports={login,addScreen,addShows,getShows,addMovie,viewTicket,getMovies};