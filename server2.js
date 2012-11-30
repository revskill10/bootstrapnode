var express = require("express"),
    app     = express(),
	hbs = require('hbs'),
	util = require('util'),
	request = require('request'),
    port    = parseInt(process.env.PORT, 10) || 4567;
    

app.configure(function(){
  
  app.use(express.cookieParser()); 
  app.use(express.session({secret: 'supersecretkeygoeshere'}));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  
  app.engine('html', require('hbs').__express);  
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  
  app.use(app.router);
});
app.get("/", function(req, res) {
  res.redirect("/index.html");
});
app.get("/api/:id", function(req, res) {
	res.cookie('cookietmp',{test: ['test1', 'test2']}, { maxAge: 900000, httpOnly: true});
	res.writeHead(200, {"Content-Type":"application/json"});
	var tmp = {
		name: req.params["id"]
	};
	
	res.end(JSON.stringify(tmp));
});
app.post("/login", function(req, res) {
	//console.log(JSON.stringify(req.body));
	 //console.log('req.body.username', req.body['username']);	
	req.session.user = req.body.username;	
	console.log("Before redirect: " + req.session.user);
	res.redirect("/profile");	
});
app.get("/profile", function(req, res) {
	console.log("After redirect: " + req.session.user);	
	var options = {
		url: 'http://localhost:4568/api',
		method: 'GET'		
	};
	request(options, function(err, response, body) {	
		console.log(util.inspect(response.headers));
		res.render("index.html", {layout: false,user: {
			username: req.session.user + body
		}});
	});
});
app.listen(port);