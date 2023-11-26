const express=require('express');
const route=express.Router();

const ActorController=require('../Controllers/ActorController');

route.get('/:id',ActorController.show);

module.exports=route;