module.exports = function(app){
    app.get('/auth/github',
    passport.authenticate('github'));
    
}