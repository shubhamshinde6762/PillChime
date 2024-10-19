import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Mealtimes = () => {
  const { currentUser, updateUser } = useAuth();

  const [breakfastTime, setBreakfastTime] = useState(currentUser.breakfastTime || '');
  const [lunchTime, setLunchTime] = useState(currentUser.lunchTime || '');
  const [dinnerTime, setDinnerTime] = useState(currentUser.dinnerTime || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call updateUser to save the meal times
    updateUser({
      ...currentUser,
      breakfastTime,
      lunchTime,
      dinnerTime,
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/profile" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Configure Meal Times</h1>
        </div>

        {/* Meal Times Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-indigo-600 mr-2" />
              <label className="text-sm text-gray-500" htmlFor="breakfastTime">Breakfast Time</label>
            </div>
            <input
              type="time"
              id="breakfastTime"
              value={breakfastTime}
              onChange={(e) => setBreakfastTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
            
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-indigo-600 mr-2" />
              <label className="text-sm text-gray-500" htmlFor="lunchTime">Lunch Time</label>
            </div>
            <input
              type="time"
              id="lunchTime"
              value={lunchTime}
              onChange={(e) => setLunchTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
            
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-indigo-600 mr-2" />
              <label className="text-sm text-gray-500" htmlFor="dinnerTime">Dinner Time</label>
            </div>
            <input
              type="time"
              id="dinnerTime"
              value={dinnerTime}
              onChange={(e) => setDinnerTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button 
            type="submit"
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Meal Times
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Mealtimes;
