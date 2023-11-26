const express=require('express');
const route=express.Router();

const HomeController=require('../Controllers/HomeController');

route.get('/',HomeController.index);


module.exports=route;