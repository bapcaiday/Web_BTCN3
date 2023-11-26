const Movie=require("../models/Movie");
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
            const dt=await Movie.run();
            await db.import('Movie',dt);
            const top5HighestRating=await Movie.get5HighestRating();
            const top30HighestBoxOffice=await Movie.get30HighestBoxOffice();
            const chunkedMovies = chunkArray(top30HighestBoxOffice, 3);
            res.render('home',{Ratings:top5HighestRating, BoxOffices: chunkedMovies});
        }
        catch (error){
            next(error);
        }
        //res.render('home');
    }
}

module.exports=new HomeController;