import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Upload, 
  FileText, 
  User, 
  Mic2, 
  Plus,
  Bell,
  Search,
  Settings,
  Clock,
  Pill,
  Link as LinkIcon
} from 'lucide-react';

const Dashboard = () => {
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

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dashboard Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser.name}!</h1>
          <p className="text-gray-600 mt-1">Manage your health records and Alexa devices</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search prescriptions..." 
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={itemVariants}
      >
        <DashboardStat 
          title="Active Prescriptions"
          value="3"
          subtitle="+2 this month"
          icon={<Pill className="w-5 h-5 text-indigo-600" />}
        />
        <DashboardStat 
          title="Connected Devices"
          value="2"
          subtitle="Alexa enabled"
          icon={<Mic2 className="w-5 h-5 text-blue-600" />}
        />
        <DashboardStat 
          title="Next Reminder"
          value="2:30 PM"
          subtitle="Medicine reminder"
          icon={<Clock className="w-5 h-5 text-green-600" />}
        />
        <DashboardStat 
          title="Active Skills"
          value="5"
          subtitle="2 recently added"
          icon={<Settings className="w-5 h-5 text-purple-600" />}
        />
      </motion.div>

      {/* Main Actions Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={itemVariants}
      >
        <Link to="/alexa-linking">
          <DashboardCard
            title="Link Alexa Account"
            description="Connect your Alexa devices and manage settings"
            icon={<LinkIcon className="w-8 h-8 text-blue-600" />}
          />
        </Link>
        <Link to="/prescriptions">
          <DashboardCard
            title="Manage Prescriptions"
            description="View and manage your prescriptions"
            icon={<FileText className="w-8 h-8 text-purple-600" />}
          />
        </Link>
        <Link to="/reminders">
          <DashboardCard
            title="Manage Reminders"
            description="Set up medication and appointment reminders"
            icon={<Clock className="w-8 h-8 text-green-600" />}
          />
        </Link>
        <Link to="/image-upload">
          <DashboardCard
            title="Upload Prescription"
            description="Upload and convert prescriptions to voice commands"
            icon={<Upload className="w-8 h-8 text-indigo-600" />}
          />
        </Link>
        <Link to="/skills">
          <DashboardCard
            title="Manage Skills"
            description="Add or remove Alexa skills"
            icon={<Settings className="w-8 h-8 text-orange-600" />}
          />
        </Link>
        <Link to="/profile">
          <DashboardCard
            title="User Profile"
            description="Update your personal information"
            icon={<User className="w-8 h-8 text-gray-600" />}
          />
        </Link>
      </motion.div>

      {/* Recent Prescriptions */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reminder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <motion.tr 
                className="hover:bg-gray-50"
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-10-18</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Amoxicillin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Every 8 hours</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                </td>
              </motion.tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DashboardStat = ({ title, value, subtitle, icon }) => (
  <motion.div 
    className="bg-white rounded-xl shadow-sm p-6"
    whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="mt-2 text-xs text-indigo-600">{subtitle}</div>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
  </motion.div>
);

const DashboardCard = ({ title, description, icon }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
    whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="p-3 bg-gray-50 rounded-lg w-fit mb-4">
      {icon}
    </div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default Dashboard;