const Movie=require("../models/Movie");
const db=require('../utils/db');


class SearchController{

    async show(req,res,next){
        try{
            const key=req.query.q;
            const movie1=await Movie.searchLike('title',key);
            const movie2=await Movie.searchInclude('genreList',key);
            const movies=movie1.concat(movie2);

            const page=parseInt(req.query.page) || 1;
            const perPage=8;
            const startIndex=(page-1)*perPage;
            const endIndex=startIndex+perPage;
            const currenMovies=movies.slice(startIndex,endIndex);
            const totalPages=Math.ceil(movies.length/perPage);
            res.render('search',{movies:currenMovies,key:key,currentPage:page,totalPages:totalPages});
        }
        catch (error){
            next(error);
        }
    }



    
}

module.exports=new SearchController;