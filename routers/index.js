const homeRouter=require('./home')
const movieRouter=require('./movie')
const searchRouter=require('./search')
const actorRouter=require('./actor')

function route(app){
    app.use('/actors',actorRouter);
    app.use('/search',searchRouter);
    app.use('/movies',movieRouter);
    app.use('/',homeRouter);
}

module.exports=route;