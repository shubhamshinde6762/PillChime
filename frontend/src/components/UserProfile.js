import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit, 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { currentUser } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const ProfileSection = ({ title, icon: Icon, value, isPrivate }) => (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="ml-4 flex-grow">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-gray-900 font-medium">
          {value || `Add ${title.toLowerCase()}`}
        </p>
      </div>
      {isPrivate && (
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
          Private
        </span>
      )}
    </div>
  );

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="flex items-center mb-8"
          variants={itemVariants}
        >
          <Link to="/dashboard" className="mr-4">
            <button className="p-2 hover:bg-white rounded-full transition-all">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-indigo-600" />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-700">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                <p className="text-gray-500">Personal Account</p>
              </div>
            </div>
            <Link to="/edit-profile">
              <motion.button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileSection title="Email" icon={Mail} value={currentUser.email} isPrivate />
            <ProfileSection title="Phone" icon={Phone} value={currentUser.phone} />
            <ProfileSection title="Address" icon={MapPin} value={currentUser.address} />
            <ProfileSection title="Date of Birth" icon={Calendar} value={currentUser.dob} isPrivate />
          </div>
        </motion.div>

        {/* Meal Times Configuration */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Times Configuration</h3>
          <div className="flex flex-col space-y-4">
            <ProfileSection 
              title="Breakfast Time" 
              icon={Clock} 
              value={currentUser.breakfastTime || 'Set time'} 
            />
            <ProfileSection 
              title="Lunch Time" 
              icon={Clock} 
              value={currentUser.lunchTime || 'Set time'} 
            />
            <ProfileSection 
              title="Dinner Time" 
              icon={Clock} 
              value={currentUser.dinnerTime || 'Set time'} 
            />
          </div>
          <Link to="/mealtimes">
            <motion.button 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Configure Meal Times
            </motion.button>
          </Link>
        </motion.div>

        {/* Account Actions */}
        <motion.div 
          className="flex justify-between items-center"
          variants={itemVariants}
        >
          <motion.button 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </motion.button>
          <motion.button 
            className="inline-flex items-center text-red-600 hover:text-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
