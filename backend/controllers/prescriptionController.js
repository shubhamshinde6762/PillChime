const Prescription = require('../models/Prescription');
const Medicine = require('../models/Medicine'); // Import the Medicine model

// Create a new prescription
const User = require('../models/User'); // Import User model to validate the current user

exports.processPrescription = async (req, res) => {
    const { patient, prescription, id } = req.body; // No need to extract email from req.body
    console.log(id, patient, prescription); // Use req.user to access the logged-in user
    const { name, age, gender, prescribedBy } = patient; // Extract patient details
    console.log(name, age, gender, prescribedBy);

    try {
        // Get the currently logged-in user from req.user (assuming it is set via middleware like auth)
        const userId = id || 1 // Use the userId from req.user which is set after authentication

        // Array to hold medicine IDs
        const medicineIds = [];

        // Loop through the prescription array to create medicine documents
        for (const med of prescription) {
            const { medicine, dosage, colour, timing } = med;

            // Create a new Medicine document
            const newMedicine = new Medicine({
                name: medicine,
                dosage: parseInt(dosage) | 1, // Ensure dosage is stored as a number
                noOfDays: 7, // Set this to the appropriate value; replace with actual logic if needed
                timings: timing, // Join timings into a single string or keep it as an array depending on your requirement
                dateIssued: new Date() // Current date
            });

            // Save the medicine and push its ID to the array
            const savedMedicine = await newMedicine.save();
            medicineIds.push(savedMedicine._id);
            console.log(savedMedicine);
        }

        // Create a new Prescription document
        const prescriptionDocument = new Prescription({
            userId, // Use the logged-in user's ID
            doctorName: prescribedBy || "Dr Aarya Bhave", // Set the doctor name from patient details
            medicineList: medicineIds // Reference to created Medicine IDs
        });

        // Save the prescription document
        await prescriptionDocument.save();
        console.log(prescriptionDocument);

        res.status(201).json({
            message: 'Prescription created successfully',
            prescriptionId: prescriptionDocument._id,
            medicines: medicineIds // Return the medicine IDs created
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing the prescription', error: error.message });
    }
};


// Get all prescriptions for a user
exports.getPrescriptions = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        // Use the authenticated user ID from req.user instead of params
        const prescriptions = await Prescription.find({ userId: userId }).populate('medicineList'); // Populate medicineList to get medicine details
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
