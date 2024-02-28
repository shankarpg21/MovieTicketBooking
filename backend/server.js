const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const cors=require('cors');
const conn=require('./config/db');
const adminRoutes=require('./routes/adminRoutes');
const userRoutes=require('./routes/userRoutes');
const port=process.env.port
conn(); 
app.use(cors());
app.use(express.json());

app.use('/users',userRoutes);
app.use('/admins',adminRoutes)

app.listen(port,()=>{
    console.log(`Server listening on the port:${port}`);
}) 

  