const express=require('express');
const router=express.Router();
const {login,addScreen,addMovie,getShows, viewTicket, getMovies, addShows}=require('../controllers/adminController');
const validateTokenHanlder = require('../middlewares/adminTokenHandler');

router.route('/login').post(login);

router.use(validateTokenHanlder);//validating Token 

router.route('/addMovie').post(addMovie);//Add movie information
router.route('/getMovies').get(getMovies)//Get Movie information

//screencontrollers
router.route('/addScreen').post(addScreen);//Add Screen information


//showcontrollers
router.route('/getShows').get(getShows) //Get all shows information
router.route('/addShow/:movie_id').post(addShows) //Add show information
router.route('/bookings/:show_id').get(viewTicket); //View Bookings in a show

module.exports=router