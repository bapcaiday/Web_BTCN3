const Movie=require("../models/Movie");
const Actor=require("../models/Actors");
const Review=require("../models/Review")
const db=require('../utils/db')

function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

class HomeController{
    async index(req,res,next){
        try{
            const dt1=await Movie.run();
            const dt2=await Actor.run();
            const dt3=await Review.run();
            await db.import('Movie',dt1);
            await db.import('Actor',dt2);
            await db.import('Review',dt3);

            const top5HighestRating=await Movie.get5HighestRating();

            const top30HighestBoxOffice=await Movie.get30HighestBoxOffice();
            const chunkedMovies = chunkArray(top30HighestBoxOffice, 3);

            const top30LatestRelease=await Movie.get30LatestRelease();
            const chunkedMovies1 = chunkArray(top30LatestRelease, 3);

            res.render('home',{Ratings:top5HighestRating, BoxOffices: chunkedMovies,LatestRelease: chunkedMovies1});
            
        }
        catch (error){
            next(error);
        }
        //res.render('home');
    }
}

module.exports=new HomeController;