var express = require("express"),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 4567;
    

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});
app.get("/", function(req, res) {
  res.redirect("/index.html");
});
app.get("/api/:id", function(req, res) {
	res.writeHead(200, {"Content-Type":"application/json"});
	var tmp = {
		name: req.params["id"]
	};
	res.end(JSON.stringify(tmp));
});
app.post("/login", function(req, res) {
	console.log(JSON.stringify(req.body));
	 //console.log('req.body.username', req.body['username']);
	 res.redirect("/index.html");
});
app.listen(port);