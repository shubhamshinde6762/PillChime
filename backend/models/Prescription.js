const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorName: { type: String, rdefault : "Unknown" },
    medicineList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }], // Array of Medicine IDs
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
