const express=require('express');
const route=express.Router();

const MovieController=require('../Controllers/MovieController');

route.get('/:id',MovieController.show);

module.exports=route;