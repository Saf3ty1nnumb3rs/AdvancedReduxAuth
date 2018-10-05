const Authentication = require('./controllers/authentication')

module.exports = function(app) {
    app.post('/signup', Authentication.signup)
    
    app.get('/', (req, res, next) => {
        res.send(['waterbottle', 'phone', 'paper'])
    });


    app.get('/dogs', (req, res, next) => {
        res.send(['schnauzer', 'beagle', 'dachsund'])
    })
}