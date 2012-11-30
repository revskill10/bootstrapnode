var express = require('express');
var app = express();
var redis = require('redis'),
	client = redis.createClient();
	
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

//...
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'cool beans' }));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));    
});
var old = '';
function checkMsg(req, res){	
	var start = new Date();
	if (start-req.socket._idleStart.getTime() > 59999) {
		console.log('idle');
		// return response
		res.write('OK', 'utf8');
		res.end();		
	} 
		
	client.get("hello", function(err, rep){		
		old = rep;
		console.log(rep == old);	
		var test = rep == old;
		if (test == false) {
			res.end(rep);	
			old = rep;		
			return false;										
		}			
			
	});
	setTimeout(function(){checkMsg(req, res);}, 3000);
}
var i = 0;
app.get("/posts", function(req, res){	
	console.log('request ' + i++);		
	checkMsg(req, res);
	
});

app.listen(3001);