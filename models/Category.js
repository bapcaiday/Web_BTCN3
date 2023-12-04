const db=require('../utils/db');
const fs = require('fs');
const tbName='Categories';

module.exports=class Product{
    constructor({CatID,CatName}){
        this.CatID=CatID;
        this.CatName=CatName;
    }

    static async getAll(){
        const data=await db.getAll(tbName);
        return data;
    }

    static async get(clName,_id){
        const data=await db.get(tbName,clName,_id);
        return data;
    }

    static async insert(user){
        const rs=await db.insert(tbName,user,'CatID');
        return rs;
    }
}