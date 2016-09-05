var express = require('express');
var router = express.Router();

router.get('/tasks', function(req, res) {
  res.send('Welcome to your list of tasks');
});

module.exports = router;