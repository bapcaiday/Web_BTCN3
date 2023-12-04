const Product=require('../models/Product');
const Category=require('../models/Category');

class ProductController{
    async show(req,res,next){
        const catData=await Category.getAll();

        const proData=await Product.getAll();

        if (req.session.user){
            res.render('product/show',{un:req.session.user.Username,Category:catData,Product:proData});
            return;
        }
        else if (req.cookies.username){
            res.render('product/show',{un:req.cookies.username,Category:catData,Product:proData});
            return;
        }
        else{
            res.render('product/show',{Category:catData,Product:proData});
        }
        

    }

    async showCat(req,res,next){
        const catData=await Category.getAll();
        
        const proData=await Product.search('CatID',req.params.id);
        //console.log(proData);
        if (req.session.user){
            res.render('product/show',{un:req.session.user.Username,Category:catData,Product:proData});
            return;
        }
        else if (req.cookies.username){
            res.render('product/show',{un:req.cookies.username,Category:catData,Product:proData});
            return;
        }
        else{
            res.render('product/show',{Category:catData,Product:proData});
        }

    }

    async create(req,res,next){
    
        if (req.session.user){
            res.render('product/create',{un:req.session.user.Username});
            return;
        }
        else if (req.cookies.username){
            res.render('product/create',{un:req.cookies.username});
            return;
        }
        else{
            res.render('product/create');
        }

    }

    async store(req,res,next){

        const newProduct=new Product({
            ProName:req.body.name,
            TinyDes:req.body.discription,
            FullDes:"",
            Price:req.body.price,
            CatID:req.body.catID,
            Quantity:req.body.quantity
        })

        const rs=await Product.insert(newProduct);
        res.redirect('./show');

    }

    async edit(req,res,next){
        const rs=await Product.get('ProID',req.params.id);
        console.log(rs);
        console.log(req.session.user);
        if (req.session.user){
            res.render('product/edit',{un:req.session.user.Username,product:rs});
            return;
        }
        else if (req.cookies.username){
            res.render('product/edit',{un:req.cookies.username,product:rs});
            return;
        }
        else{
            res.redirect('../show');
        }
    }

    async update(req,res,next){
        const newProduct=new Product({
            ProName:req.body.name,
            TinyDes:req.body.discription,
            Price:req.body.price,
            CatID:req.body.catID,
            Quantity:req.body.quantity
        });

        const rs=await Product.update(newProduct,req.params.id);
        res.redirect('./show');
    }

    async destroy(req,res,next){
        const rs=Product.delete(req.params.id);
        res.redirect('./show');
    }
}

module.exports=new ProductController;