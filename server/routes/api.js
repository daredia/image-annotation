var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Task = require('../db');

router.route('/annotation')
  .get(function(req, res) {
    Task.find(function(err, tasks) {
      (err) ? res.send(err) : res.json(tasks);
    });
  })

  .post(function(req, res) {
    var task = new Task(req.body);
    task.save(function(err, task) {
      (err) ? res.send(err) : res.status(200).json(task);
    });
  }
);

module.exports = router;