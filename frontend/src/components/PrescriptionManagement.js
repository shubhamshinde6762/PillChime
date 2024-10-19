import React, { useState, useEffect } from "react";
import {
  Trash2,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; 

const PrescriptionManagement = () => {
  const [prescriptions, setPrescriptions] = useState([]); // State to hold prescriptions from the API
  const [expandedPrescription, setExpandedPrescription] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const { currentUser } = useAuth();
  console.log("Current user", currentUser)

  // Fetch prescriptions from the API
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prescription/${currentUser.id}`
        //   , {
        //   headers: { Authorization: `Bearer ${token}` }, // Pass the token in the request
        // }
      );
        setPrescriptions(response.data); // Set prescriptions from API response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescriptions", error);
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  // Delete prescription function
  const deletePrescription = (prescriptionId) => {
    setPrescriptions(prescriptions.filter((p) => p._id !== prescriptionId));
  };

  // Calculate progress of medication days
  const calculateProgress = (remainingDays, totalDays) => {
    return ((totalDays - remainingDays) / totalDays) * 100;
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.div className="flex items-center mb-4 md:mb-0">
            <Link to="/dashboard" className="mr-4">
              <button className="p-2 hover:bg-white rounded-full transition-all">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Manage Prescriptions
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                View and manage your medical prescriptions
              </p>
            </div>
          </motion.div>
          <Link
            to="/image-upload"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Prescription
          </Link>
        </div>

        {/* Active Prescriptions */}
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Prescribed by {prescription.doctorName}
                    </h2>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(prescription.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => deletePrescription(prescription._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setExpandedPrescription(
                          expandedPrescription === prescription._id
                            ? null
                            : prescription._id
                        )
                      }
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {expandedPrescription === prescription._id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedPrescription === prescription._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-gray-50 border-t p-6">
                      <div className="space-y-6">
                        {prescription.medicineList.map((medicine, index) => (
                          <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-sm"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {medicine.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {medicine.dosage}mg
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {medicine.timings}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">
                                  Progress
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {medicine.noOfDays} days prescribed
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-indigo-600 h-2 rounded-full"
                                  style={{
                                    width: `${calculateProgress(
                                      medicine.noOfDays - 2, // Example calculation (change accordingly)
                                      medicine.noOfDays
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {medicine.notes && (
                              <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {medicine.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {prescriptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No prescriptions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionManagement;
