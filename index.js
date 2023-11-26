require ('dotenv').config();
const path=require('path');
const express=require ('express');
const {engine}=require('express-handlebars');
const methodOverride=require("method-override");

const app=express();
const port=process.env.PORT || 3000;

const db=require('./utils/db');
const Movie=require('./models/Movie')
const fs = require('fs');
const route=require("./routers");

app.use('/public/js',express.static(__dirname+'/public/js'));
app.use('/public/css',express.static(__dirname+'/public/css'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    })
);

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

route(app);

app.listen(port,()=>console.log(`App listening at http:://localhost:${port}`));

