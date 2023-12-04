const Movie=require("../models/User");
const db=require('../utils/db')


class HomeController{
    async index(req,res,next){     

        if (req.cookies.username){
            res.render('home',{un:req.cookies.username});
            return;
        }
        else if (req.session.user){
            res.render('home',{un:req.session.user.Username});
            return;
        }
        res.render('home');
    }
}

module.exports=new HomeController;