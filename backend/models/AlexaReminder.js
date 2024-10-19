const mongoose = require('mongoose');

const alexaReminderSchema = new mongoose.Schema({
  alexaAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'AlexaAccount', required: true },
  text: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AlexaReminder', alexaReminderSchema);