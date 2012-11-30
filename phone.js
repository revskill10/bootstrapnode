var express = require('express'),
,	pg = require('pg')
,	hbs = require('hbs')
,	app = express();

var conStr = "tcp://support:support@localhost/phone";
var client = new pg.Client(conStr);
client.connect();


app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public_phone'));	
	app.engine('html', require('hbs').__express);  
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
	res.writeHead(200, {'Content-Type':'text/html'});
	client.query('select name, number from phone', function(err, result) {
		if (!err){
			var phones = [];
			
		}
	});
});

app.listen(3002);