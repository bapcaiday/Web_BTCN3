const express=require('express');
const route=express.Router();

const ProductController=require('../Controllers/ProductController');

route.put('/:id',ProductController.update);
route.delete('/:id',ProductController.destroy);
route.get('/:id/edit',ProductController.edit);
route.get('/:id/show',ProductController.showCat);

route.post('/store',ProductController.store);
route.get('/create',ProductController.create);
route.get('/show',ProductController.show);

module.exports=route;