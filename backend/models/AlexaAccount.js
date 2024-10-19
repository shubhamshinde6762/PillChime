const mongoose = require('mongoose');

const alexaAccountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  alexaId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AlexaAccount', alexaAccountSchema);