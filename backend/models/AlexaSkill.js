const mongoose = require('mongoose');

const alexaSkillSchema = new mongoose.Schema({
  alexaAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'AlexaAccount', required: true },
  name: { type: String, required: true },
  skillId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AlexaSkill', alexaSkillSchema);