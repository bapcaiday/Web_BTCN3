const db=require('../utils/db');
const fs = require('fs');
const tbName='Movie';
  

module.exports=class Movie{
    constructor({id,title,fullTitle,originalTitle,year,image,releaseDate,runtimeStr
        ,plot,awards, directorList,writerList,actorList,genreList,companies,
        countries,languages,imDbRating,boxOffice,posters,images,plotFull,similars}){
        this.id=id;
        this.title=title;
        this.fullTitle=fullTitle;
        this.originalTitle=originalTitle
        this.year=year;
        this.image=image;
        this.releaseDate=releaseDate;
        this.runtimeStr=runtimeStr;
        this.plot=plot;
        this.awards=awards;
        this.directorList=directorList;
        this.writerList=writerList;
        this.actorList=actorList;
        this.genreList=genreList;
        this.companies=companies;
        this.countries=countries;
        this.languages=languages;
        this.imDbRating=imDbRating;
        this.posters=posters;
        this.images=images;
        this.boxOffice=boxOffice;
        this.plotFull=plotFull;
        this.similars=similars;
    }

    static async run(){
        try{
            const rawData=fs.readFileSync('./data/data.json');
            const jsonData=JSON.parse(rawData);

            return jsonData.Movies.map(p=>{
                return new Movie(p);
            });
        }
        catch (error){
            console.error('Error importing data:',error);
        }
    }

    static async getAll(){
        const data=await db.getAll(tbName);
        return data;
    }

    static async insert(movie){
        const rs=await db.insert(tbName,movie);
        return rs;
    }

    static async get5HighestRating(){
        const data=await db.getAll(tbName);
        
    }

}