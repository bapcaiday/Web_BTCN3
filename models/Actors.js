const { json } = require('body-parser');
const db=require('../utils/db');
const fs = require('fs');
const tbName='Actor';
  

module.exports=class Actor{
    constructor({id,name,role,image,summary,birthDate,deathDate,awards,height,castMovies,images}){
        this.id=id;
        this.name=name;
        this.role=role;
        this.image=image;
        this.summary=summary;
        this.birthDate=birthDate;
        this.deathDate=deathDate;
        this.awards=awards;
        this.height=height;
        this.castMovies=castMovies;
        this.images=images;
    }

    static async run(){
        try{
            const rawData=fs.readFileSync('./data/data.json');
            const jsonData=JSON.parse(rawData);
            return jsonData.Names.map(p=>{
                return new Actor(p);
            });
        }
        catch (error){
            console.error('Error importing data:',error);
        }
    }

    static async search(clName,_id){
        const data=await db.search(tbName,clName,_id);
        for (const dt of data){
          if (dt.images!=null)
          {
            const movieList=[];
            for (const rec of dt.images){
                movieList.push(JSON.parse(rec));
            }
            dt.images=movieList;
          }
        }
        return data;
    }

    static async getAll(){
        const data=await db.getAll(tbName);
        return data;
    }

    static async insert(actor){
        const rs=await db.insert(tbName,actor);
        return rs;
    }

}