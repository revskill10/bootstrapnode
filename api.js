var express = require("express"),
    app     = express(),
	hbs = require('hbs'),
	mongoose = require('mongoose'),
    port    = parseInt(process.env.PORT, 10) || 4568;
    
app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public_api'));	
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.get('/api', function (req, res) {
	var cookies = {};
	req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
		var parts = cookie.split('=');
		cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});
	if (!cookies['testcookie']) {
		console.log('First request');
		res.cookie('testcookie','testvaluecookie',{ maxAge: 900000, httpOnly: true });
		res.end('FirstRequest');
	} else {
		console.log(cookies['testcookie']);
		res.end(cookies['testcookie']);
	}
}); 

app.listen(port);