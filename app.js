'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const yelp = require('yelp-fusion');

var routes = require('./routes/index');
var coffee = require('./routes/coffee_routes');

var port = 3080;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname+ '/node_modules/bootstrap/dist/css'));

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Define Routes
app.use('/', routes);
app.use('/coffee', coffee);

app.get('/searching', function(req, res){

const client = yelp.client('dBD-PRBKZXob9RDqiNHtewq5nK6zlCggac8NVHRw0FZngNLClPF5-_eC8nQq0E6N59wQz9KOCzjWo2Ylch4NVhgzb6iLbfpIfmCCdPACLBkfdx5gG_mSy7Y5UCtEWnYx');
// testing the route
// res.send("WHEEE");
client.search({
	term: req.query.term,
	latitude: req.query.latitude,
	longitude: req.query.longitude	
}).then(response => {
	var results = response.jsonBody;
	res.json(JSON.stringify(results));    
}).catch(e => {
	  console.log(e);
});
});

app.listen(port);
console.log('Server started on port ' +port);

module.exports = app;