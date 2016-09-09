var basicAuth = require('basic-auth');

var auth = function(req, res, next) {
  var unauthorized = function(res) {
    res.set('WWW_Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name) {
    return unauthorized(res);
  }

  return (user.name === 'my_api_key') ? next() : unauthorized(res);
};

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = {
  auth: auth,
  allowCrossDomain, allowCrossDomain
};