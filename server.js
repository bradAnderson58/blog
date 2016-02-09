// server.js

// BASE SETUP
// ==========

var mongoose = require('mongoose');


var Bear = require('./app/models/bear');
var Blog = require('./app/models/blog');

// call the packages we need
var express = require('express');			// call express
var app = express();						// define app using express
var bodyParser = require('body-parser');	// pull information from HTML POST
var methodOverride = require('method-override');
var morgan = require('morgan');				// log requests to the console
var favicon = require('serve-favicon');

// configuration ==================

//mongoose.connect('mongodb://162.243.106.72:27017/blogdb');	// connect to our database
mongoose.connect('mongodb://localhost:27017/test')

app.use(express.static(__dirname + '/app'));		// set the static files location /public/img will be /img for users
app.use(morgan('dev'));								// log every request to the console

// configure app to use bodyParser()
// this will let us get the data from a x-www-form-urlencoded or vnd.api+json
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());
app.use(favicon(__dirname + '/app/favicon.ico'));

var port = process.env.PORT || 8080;	// set the port

// ROUTES FOR API CALLS
// ====================

var router = express.Router();	// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test rout to make sure everything is working http://localhost:8080/api
router.get('/', function(req, res) {
	res.json({message: 'hooray! we made it!' });
});

// more routes for our API added here

// on routes that end in /bears
// ----------------------------
router.route('/bears')
	// create a bear (POST http://localhost:8080/api/bears)
	.post(function(req, res) {

		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;	// set the bears name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({message: 'Bear Created!' });
		});		
	})

	// get all the bears (GET http://localhost:8080/api/bears)
	.get(function (req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id
// -------------------------------------
router.route('/bears/:bear_id')
	// get the bear with this id (GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Bear. findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);

			res.json(bear);
		});
	})

	// update the bear with this id (PUT http://localhost:8080/api/bears/:bear_id)
	.put(function(req, res) {

		// useour bear model to findthe bear we want
		Bear.findById(req.params.bear_id, function(err, bear) {
			if(err)
				res.send(err);

			bear.name = req.body.name; // update the bears info

			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear Updated!' });
			});
		});
	})

	// delete the bear with this id (DELETE http://localhost:8080/api/bears/:bear_id)
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err)

			res.json({ message: 'Successfully deleted' });
		});
	});

// blog routes here
router.route('/blogs')
	// create new blog post
	.post(function(req, res){
		var blog = new Blog();
		blog.title = req.body.title;
		blog.biline = req.body.biline;
		blog.body = req.body.body;
	
		blog.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Blog stored'});
		})
	})

	.get(function (req, res) {
		Blog.find(function(err, blogs) {
			if (err)
				res.send(err);
			
			res.json(blogs);
		})
	});


// do specific things with individual blogs
router.route('/blogs/:blog_id')

	.delete(function(req, res) {
		Blog.remove({
			_id: req.params.blog_id
		}, function(err, blog) {
			if (err)
				res.send(err);
			
			res.json({message: "successfully deleted"});
		})
	})

// REGISTER OUR ROUTES
// all routes prefixed with /api
app.use('/api', router);

// application
// ===========
app.get('*', function(req, res) {
	res.sendfile('./app/index.html');  // load this when we hit localhost:8080
})

// START THE SERVER
// ================

app.listen(port);
console.log('Magic happens on port: ' + port);