var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function connect() {
	mongoose.connect('mongodb://localhost/testdatabase');
}
function disconnect() { mongoose.disconnect();}

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

