const express=require('express');
const validateTokenHanlder=require('../middlewares/userTokenHandler');
const {login,register, getShow,getScreen, bookShow,viewTicket,getSeats}=require('../controllers/userController');
const router=express.Router();

router.route('/register').post(register);//good
router.route('/login').post(login);//good

router.route('/getShows').get(getShow);//good
router.route('/getScreens/:id').get(getScreen);//good
router.use(validateTokenHanlder);
router.route('/getSeats/:show_id').get(getSeats);//good
router.route('/bookShows').put(bookShow);//good
router.route('/viewTickets').get(viewTicket)//
module.exports=router