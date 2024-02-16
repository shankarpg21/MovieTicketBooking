const express=require('express');
const validateTokenHanlder=require('../middlewares/userTokenHandler');
const {login,register, getShow,getScreen, bookShow,viewTicket,getSeats}=require('../controllers/userController');
const router=express.Router();

router.route('/register').post(register);//register
router.route('/login').post(login);//login

router.route('/getShows').get(getShow);//getShows
router.route('/getScreens/:id').get(getScreen);//getScreen for movie
router.use(validateTokenHanlder);
router.route('/getSeats/:show_id').get(getSeats);//view seat availability
router.route('/bookShows').put(bookShow);//book ticket
router.route('/viewTickets').get(viewTicket)//view ticket
module.exports=router