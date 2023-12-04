const db=require('../utils/db');
const fs = require('fs');
const tbName='Products';

module.exports=class Product{
    constructor({ProName,TinyDes,FullDes,Price,CatID,Quantity}){
        this.ProName=ProName;
        this.TinyDes=TinyDes;
        this.FullDes=FullDes;
        this.Price=Price;
        this.CatID=CatID;
        this.Quantity=Quantity;
    }

    static async getAll(){
        const data=await db.getAll(tbName);

        return data;
    };
  

    static async get(clName,_id){
        const data=await db.get(tbName,clName,_id);
        return data;
    }

    static async search(clName,_id){
        const data=await db.search(tbName,clName,_id);
        return data;
    }

    static async insert(user){
        const rs=await db.insert(tbName,user,'ProID');
        return rs;
    }

    static async delete(id){
        const rs=await db.delete(tbName,'ProID',id);
        return rs;
    }

    static async update(user,id){
        let rs=await db.update(tbName,'ProName',user.ProName,'ProID',id);
        rs=await db.update(tbName,'TinyDes',user.TinyDes,'ProID',id);
        rs=await db.update(tbName,'Price',user.Price,'ProID',id);
        rs=await db.update(tbName,'CatID',user.CatID,'ProID',id);
        rs=await db.update(tbName,'Quantity',user.Quantity,'ProID',id);

        return rs;
    }

    
}
  