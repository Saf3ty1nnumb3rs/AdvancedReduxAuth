module.exports = function(app) {
    
    
    app.get('/', (req, res, next) => {
        res.send(['waterbottle', 'phone', 'paper'])
    });


    app.get('/dogs', (req, res, next) => {
        res.send(['schnauzer', 'beagle', 'dachsund'])
    })
}