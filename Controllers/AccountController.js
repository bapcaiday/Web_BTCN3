const User=require('../models/User');
const { use } = require('../routers/home');
const bcrypt=require('bcrypt');
const saltRounds=10;

class AccountController{
    async signout(req,res,next){
        req.session.destroy(err=>{
            if (err){
                res.json({success:false,msg:"Error logging out"});
            }
            else{
                res.clearCookie('username');
                console.log("Sign out successfully!");
                res.redirect('/');
            }
        })
    }
    async signin(req,res,next){ 
        //console.log(req.cookies.username);
        if (req.session.user){
            res.redirect('/');
        }
        else if (req.cookies.username){
            res.redirect('/');
        }
        else{
            res.render('account/signin');
        }
    }

    async signup(req,res,next){  
        if (req.session.user){
           res.redirect('/');
            return;
        }       
        res.render('account/signup');
    }

    async add(req,res,next){
        try{
            const username=req.body.username;
            const psw=req.body.psw;
            const pwHashed=await bcrypt.hash(psw,saltRounds);

            const user=new User({
                Username:username,
                Password:pwHashed
            })
    
            const rs=await User.insert(user);
           
            res.redirect('/account/signin');
        } catch(error){
            next(error);
        }   
    }

    async check(req,res,next){
        try{
        const username=req.body.username;
        const psw=req.body.psw;
        const pwHashed=await bcrypt.hash(psw,saltRounds);
        
        const rs=await User.get('Username',username);
        let auth=false;
        if (rs){
            auth=await bcrypt.compare(psw,rs.Password);
        }
        if (auth){
            req.session.user=rs;
            if (req.body.remember){
                res.cookie('username',rs.Username,{maxAge:86400000, httpOnly:true });
                res.render('home',{un:rs.Username});
                return;
            }
            res.render('account/signin',{msg:"Sign in successfully!",color:"success"});
        }
        else{
            res.render('account/signin',{msg:"Sign in failed!",color:"danger"})
        }
       }
       catch(error){
        next(error);
       }
    }
}

module.exports=new AccountController;