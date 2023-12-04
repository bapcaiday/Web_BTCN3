require('dotenv').config;
const { rejects } = require('assert');
const fs = require('fs');
const { helpers } = require('handlebars');
const { resolve } = require('path');

const pgp=require('pg-promise')({
   capSQL:true
});

const cn={
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DBNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW
};


const db=pgp(cn);

module.exports={
    getAll: async (tbName)=>{
        let dbcn=null;
            try{
                dbcn=await db.connect();
                const data=await dbcn.any(`SELECT * FROM $1:name`,tbName);
                return data;
            } catch (error){
                throw error;
            } finally{
                dbcn.done();
            }
    },
    insert: async(tbName, entity, idName='ID')=>{
        const query=pgp.helpers.insert(entity,null, tbName);
        const data=await db.one(query+`RETURNING "${idName}"`);
        return data;
    }, 
    update: async(tbName,clName,value,primaryKey,key)=>{
      const result = await db.result(
        'UPDATE $1:name SET $2:name = $3 WHERE $4:name = $5',
        [tbName, clName, value,primaryKey,key] 
    );
      console.log(result);
    },
    delete: async(tbName,primaryKey,key)=>{
      const result = await db.result(
        'DELETE FROM $1:name WHERE  $2:name = $3',
        [tbName,primaryKey,key] // Thay thế bằng giá trị ID của bản ghi bạn muốn xóa
        );
      console.log(result);
    },
    get: async(tbName,clName, _id)=>{
        let dbcn=null;
        try {
            dbcn=await db.connect();
            const result=await dbcn.oneOrNone(`SELECT * FROM $1:name WHERE $2:name=$3`,[tbName,clName,_id]);
            return result;
          } catch (error) {
            console.error('ERROR:', error);
          } 
          finally{
            dbcn.done();
          }
    }, 
    get: async(tbName,clName, _id)=>{
      let dbcn=null;
      try {
          dbcn=await db.connect();
          const result=await dbcn.oneOrNone(`SELECT * FROM $1:name WHERE $2:name=$3`,[tbName,clName,_id]);
          return result;
        } catch (error) {
          console.error('ERROR:', error);
        } 
        finally{
          dbcn.done();
        }
    }, 
    search: async(tbName,clName, _id)=>{
        let dbcn=null;
        try {
            dbcn=await db.connect();
            const result=await dbcn.any(`SELECT * FROM $1:name WHERE $2:name=$3`,[tbName,clName,_id]);
            return result;
          } catch (error) {
            console.error('ERROR:', error);
          } 
          finally{
            dbcn.done();
          }
    }, 
    
 
};

