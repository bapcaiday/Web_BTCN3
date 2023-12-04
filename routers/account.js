const express=require('express');
const route=express.Router();

const AccountController=require('../Controllers/AccountController');

route.get('/signout',AccountController.signout);
route.post('/check',AccountController.check);
route.get('/signin',AccountController.signin);
route.post('/add',AccountController.add);
route.get('/signup',AccountController.signup);


module.exports=route;