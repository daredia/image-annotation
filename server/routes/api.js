var router = require('express').Router();
var validUrl = require('valid-url');
var axios = require('axios');
var Task = require('../db');
var middleware = require('../middleware');

router.use(middleware.allowCrossDomain);
router.use(middleware.auth);

router.route('/annotation')
  .get(function(req, res) {
    Task.find({ status: 'pending' }, function(err, tasks) {
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

router.route('/annotation/:id')
  .put(function(req, res) {
    Task.findByIdAndUpdate(req.params.id, 
      { $set: { status: 'completed' } }, { new: true },
      function(err, task) {
        if (err) {
          return res.send(err);
        }

        axios.post(task.callback_url, task, {
          auth: {
            username: 'my_api_key'
          }
        })
        // TODO: remove the .then()
        .then((response) => res.status(200).json(JSON.parse(response.config.data)))
        .catch((err) => console.log(err));

        // res.sendStatus(200);
      }
    );
  }
);

// for testing purposes
router.route('/callback')
  .post(function(req, res) {
    res.status(200).json(req.body.data);
  }
);

module.exports = router;