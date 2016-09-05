// DEFINE MODELS ==========================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  instruction: String,
  attachment: String,
  attachment_type: String,
  objects_to_annotate: [],
  with_labels: Boolean,
  callback_url: String,
  status: String, // values: pending, completed
  type: String, // values: annotation
  completed_at: Date
},
  {
    timestamps: true
  }
);

mongoose.connect('mongodb://localhost/scale-image-annotation');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
  console.log('Mongo is connected!');
});

module.exports = mongoose.model('Task', TaskSchema);