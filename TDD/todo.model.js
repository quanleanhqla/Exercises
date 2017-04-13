let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TodoSchema = Schema({
  todo: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  time_created: {
    type: Date,
    default: Date.now
  }
});

let TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;