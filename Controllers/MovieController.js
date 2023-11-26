const Movie=require("../models/Movie")
const Actor=require("../models/Actors")
const db=require('../utils/db')

class MovieController{
    async show(req,res,next){
       const _id=req.params.id;
       const movie=await Movie.search('id',_id);
       const actList=[];
       for (const dt of movie[0].actorList){
         const act=await Actor.search('id',dt.id);
         actList.push(act[0]);
       }
       res.render('movie/show',{movie:movie,actList: actList});
    }
}

module.exports=new MovieController;