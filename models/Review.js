const { json } = require('body-parser');
const db=require('../utils/db');
const fs = require('fs');
const tbName='Review';
  

module.exports=class Review{
    constructor({movieId,items}){
        this.movieId=movieId;
        this.items=items;
    }

    static async run(){
        try{
            const rawData=fs.readFileSync('./data/data.json');
            const jsonData=JSON.parse(rawData);
            return jsonData.Reviews.map(p=>{
                return new Review(p);
            });
        }
        catch (error){
            console.error('Error importing data:',error);
        }
    }

    static async search(clName,_id){
        const data=await db.search(tbName,clName,_id);
        for (const dt of data){
          if (dt.items!=null)
          {
            const itemList=[];
            for (const rec of dt.items){
                itemList.push(JSON.parse(rec));
            }
            dt.items=itemList;
          }
        }
        return data;
    }
}