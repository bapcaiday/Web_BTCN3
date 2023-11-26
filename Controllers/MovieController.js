const Movie=require("../models/Movie")
const db=require('../utils/db')

class MovieController{
    async show(req,res,next){
       const _id=req.params.id;
       const movie=await Movie.search('id',_id);
       console.log(movie);
       res.render('movie/show',{movie:movie});
    }
}

module.exports=new MovieController;