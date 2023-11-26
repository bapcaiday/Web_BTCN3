const homeRouter=require('./home')
const movieRouter=require('./movie')
const searchRouter=require('./search')

function route(app){
    app.use('/search',searchRouter);
    app.use('/movies',movieRouter);
    app.use('/',homeRouter);
}

module.exports=route;