var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/annotation', function(req, res) {
  res.send('Welcome to the annotation endpoint');
});

router.post('/annotation', function(req, res) {
  res.status(200).json(req.body);
});

module.exports = router;