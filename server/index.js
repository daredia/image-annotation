var app = require('./config');
var port = process.env.PORT || 4567;

app.listen(port);

console.log('Server now listening on port', port);