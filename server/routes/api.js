var express = require('express');
var router = express.Router();

router.get('/annotation', function(req, res) {
  res.send('Welcome to the annotation endpoint');
});

module.exports = router;