const jwt=require("jsonwebtoken");
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const Users=require('../models/userModel');
const Movies=require('../models/movieModel');
const Shows=require('../models/showModel')
const Bookings=require('../models/bookingModel')
const register=asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body;
    if(!email||!password){
        return res.status(400).send("All fields are mandatory");
    }
    const hashedpw=await bcrypt.hash(password,10);
    await Users.create({"email":email,"userName":userName,"password":hashedpw});
    res.status(200).send("Registrartion succesfull");
});

const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).send("All fields are mandatory");
    }
    const user=await Users.findOne({"email":email});
    if(user && await bcrypt.compare(password,user.password)){
        const accessToken=jwt.sign(
            {
                user:user.email
            },process.env.ACCESS_TOKEN_USER
        )
        return res.status(200).send({accessToken,email});
    }
    else{
        res.status(400).send("Invalid credentials");
    }
})


const bookShow=asyncHandler(async(req,res)=>{
    const id=req.user;
    let {show_id,bookings}=req.body;
    if(!show_id){
        return res.status(400).send("All fields are mandatory");
    }
    const chk=await Shows.find({"show_id":show_id})
    let seats=chk[0].seats;
    for(let i=0;i<bookings.length;i++){
        seats[bookings[i]]=1
    }
    await Shows.updateOne({"show_id":show_id},{$set:{"seats":seats}});
    await Bookings.create({"user_id":id,"show_id":show_id,"bookedSeats":bookings,"screen_id":chk[0].screen_id,"date":chk[0].date,"time":chk[0].time});
    res.status(200).send("Ticket Booked successfully");
})

const viewTicket=asyncHandler(async(req,res)=>{
    const id=req.user;
    const chk=await Bookings.aggregate([
        {
            $lookup:{
                from:"shows",
                localField:"show_id",
                foreignField:"show_id",
                as:"ticketDetails"
            }
        },
        {
            $unwind:`$ticketDetails`
        },
        {
            $match:{"user_id":id}
        },
        {
            $lookup:{
                from:"movies",
                localField:"ticketDetails.movie_id",
                foreignField:"movie_id",
                as:"movieDetails"
            }
        },
        {
            $unwind:`$movieDetails`
        },
        {
            $project:{
                "bookedSeats":1,
                "show_id":1,
                "screen_id":"$ticketDetails.screen_id",
                "date":1,
                "time":1,
                "movie_name":"$movieDetails.movie_name"
            }
        }
    ])
    res.status(200).send(chk);
})

const getScreen=asyncHandler(async(req,res)=>{
    const movie_id=req.params.id;
    try{
        if(!movie_id){
            return res.status(400).send("Mention Movie id");
        }
        const chk=await Shows.find({"movie_id":movie_id});
        if(!chk){
            return res.status(400).send("No screens for that movie");
        }
        const info=await Shows.find({$and:[{"movie_id":movie_id,"date":{$gte:new Date()}}]})
        res.status(200).send(info)
    }
    catch(e){
        res.status(400).json(e);
        console.log(e);
    }
})

const getShow=asyncHandler(async(req,res)=>{
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
            {$match: {
                "showDetails.date": { $gte: new Date() } 
            }},
            {$unwind:`$showDetails`},
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
        res.status(400).send(e);
    }
})

const getSeats=asyncHandler(async(req,res)=>{
    const show_id=req.params.show_id;
    if(!show_id){
        return res.status(400).send("Mention show id to see available seats for the show")
    }
    const msg=await Shows.find({"show_id":show_id});
    res.status(200).send(msg[0])
})
module.exports={login,register,getShow,getScreen,bookShow,viewTicket,getSeats}