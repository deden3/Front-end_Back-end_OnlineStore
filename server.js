// server.js

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bears'); // connect to our database
var Bear     = require('./app/models/bear');
var Fruit    = require('./app/models/fruit');
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /shopping
//---------------------------------
router.route('/fruits')

    // create a new fruit accessed at POST http://localhost:8080/api/shopping
    .post(function(req,res){
        if(req.body.price==null)
            res.send(err);//price is required, tax optional
            
        var fruit = new Fruit();//create new instance of Fruit from script model
        fruit.name = req.body.name;
        fruit.price = req.body.price;
        fruit.tax = req.body.tax;
        fruit.quantity = req.body.quantity;
        fruit.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Fruit created!' });
        });
        
    })
     .get(function(req, res) {
     Fruit.find(function(err, fruits) {
            if (err)
                res.send(err);

            res.json(fruits);
        });
    });
// on routes that end in /fruits/:fruit_id
// -------------
router.route('/fruits/:fruit_id')

    // get the fruit with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Fruit.findById(req.params.fruit_id, function(err, fruit) {
            if (err)
                res.send(err);
            res.json(fruit);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/quantityapi/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Fruit.findById(req.params.fruit_id, function(err, fruit) {

            if (err)
                res.send(err);
            if(req.body.tax!=fruit.tax&&req.body.tax!=null)
                fruit.tax = req.body.tax;  // update the fruits info
            if(req.body.quantity!=fruit.quantity&&req.body.quantity!=null)
                fruit.quantity = req.body.quantity;  // update the fruits info
                
            
            // save the bear
            fruit.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Fruit  updated!' });
            });

        });
    })
     // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Fruit.remove({
            _id: req.params.fruit_id
        }, function(err, fruit) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
                
            res.json(bear);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
     // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
    
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);