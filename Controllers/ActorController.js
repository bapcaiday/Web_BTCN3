const Movie=require("../models/Movie")
const Actor=require("../models/Actors")
const db=require('../utils/db')

function chunkArray(array, chunkSize) {
    if (array!=null){
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    
    return result;
   }
  }

class ActorController{
    async show(req,res,next){
        const _id=req.params.id;
        const actor=await Actor.search('id',_id);
        const movList=chunkArray(actor[0].images,3);
        res.render('actor/show',{actor:actor,movList:movList});
    }
}

module.exports=new ActorController;