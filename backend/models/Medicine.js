const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: Number, required: true }, // in mg
    noOfDays: { type: Number, required: true },
    timings: { type: String, required: true }, // e.g., "after lunch"
    dateIssued: { type: Date, default: Date.now }, // Automatically set to now if not provided

});

module.exports = mongoose.model('Medicine', medicineSchema);
