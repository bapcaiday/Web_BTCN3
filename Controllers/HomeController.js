const Movie=require("../models/Movie");
const db=require('../utils/db')


class HomeController{
    async index(req,res,next){
        try{
            const dt=await Movie.run();
            await db.import('Movie',dt);
            const data=await Movie.getAll('Movie');
            res.render('home',{movies:data});
        }
        catch (error){
            next(error);
        }
        //res.render('home');
    }
}

module.exports=new HomeController;