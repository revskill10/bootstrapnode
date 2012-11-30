var express = require('express')
,	routes = require('./routes')
,	fs = require('fs')
,	User = require('./models/User.js');

app.get('/', routes.index);

app.get('/form', function(req, res) {
	fs.readFile('./form.html', function(error, content) {
		if (error) {
			res.writeHead(500);
			res.end();
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(content, 'utf-8');
		}
	}
});