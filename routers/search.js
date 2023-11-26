const express=require('express');
const route=express.Router();

const SearchController=require('../Controllers/SearchController');

route.get('/',SearchController.show);


module.exports=route;