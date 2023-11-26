const Movie=require("../models/Movie");
const db=require('../utils/db');

class SearchController{
    async show(req,res,next){
        try{
            const key=req.query.q;
            const movie1=await Movie.searchLike('title',key);
            const movie2=await Movie.searchLike('genreList',key);
            const movie=movie1.concat(movie2);
            res.json(movie);
        }
        catch (error){
            next(error);
        }
    }
}

module.exports=new SearchController;