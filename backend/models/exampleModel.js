const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // Other fields
});

module.exports = mongoose.model('Example', exampleSchema);
