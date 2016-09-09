var router = require('express').Router();
var validUrl = require('valid-url');
var Task = require('../db');
var middleware = require('../middleware');

router.use(middleware.allowCrossDomain);
router.use(middleware.auth);

router.route('/annotation')
  .get(function(req, res) {
    Task.find(function(err, tasks) {
      (err) ? res.send(err) : res.status(200).json(tasks);
    });
  })

  .post(function(req, res) {
    var task = new Task(req.body);
    
    if (task.attachment_type !== 'image') {
      return res.sendStatus(400);
    }

    if (!(validUrl.isUri(task.attachment) && validUrl.isUri(task.callback_url))) {
      return res.sendStatus(400);
    }
    
    task.objects_to_annotate = task.objects_to_annotate.replace(/\'/g, '"');
    if (!Array.isArray(JSON.parse(task.objects_to_annotate))) {
      return res.sendStatus(400);
    }

    task.save(function(err, task) {
      (err) ? res.send(err) : res.status(200).json(task);
    });
  }
);

module.exports = router;