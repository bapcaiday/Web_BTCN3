const Movie=require("../models/Movie")
const Actor=require("../models/Actors")
const Review=require("../models/Review")
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

       const rv=await Review.search('movieId',_id);
       var reviewList=null;
       if (rv[0]!=null)
       {
        reviewList=rv[0].items;
       }
       res.render('movie/show',{movie:movie,actList: actList,reviewList:reviewList});
          
    }
}

module.exports=new MovieController;