import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Pill, Clock, Brain, ChevronDown, ChevronUp } from "lucide-react";

function Home() {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "Smart Prescription Analysis",
      description: "Upload your prescription for instant digital analysis using advanced AI algorithms.",
      icon: <Pill className="w-12 h-12 text-blue-500" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Personalized Alexa Reminders",
      description: "Receive customized Alexa reminders for your medication schedule, ensuring you never miss a dose.",
      icon: <Clock className="w-12 h-12 text-green-500" />,
      color: "from-green-400 to-green-600",
    },
    {
      title: "AI-Powered Health Insights",
      description: "Get personalized health insights and tips based on your prescription and medical history.",
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          variants={itemVariants}
        >
          PrescriptAlert
        </motion.h1>
        <motion.p className="text-2xl mb-12 text-center text-gray-700" variants={itemVariants}>
          Revolutionizing medication management with AI-powered analysis and smart reminders
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
          variants={itemVariants}
        >
          <Link
            to="/upload"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Analyze Prescription
          </Link>
          <Link
            to="/how-it-works"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition duration-300 shadow-lg transform hover:scale-105"
          >
            See How It Works
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              isExpanded={expandedFeature === index}
              onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-semibold mb-4">Why Choose PrescriptAlert?</h2>
          <p className="text-xl text-gray-700 mb-8">Our mission is to simplify medication management and improve health outcomes through innovative technology.</p>
          <Link
            to="/testimonials"
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg underline"
          >
            Read Success Stories
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ title, description, icon, color, isExpanded, onClick }) {
  return (
    <motion.div
      className={`bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${isExpanded ? 'row-span-2' : ''}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${color}`} />
      <div className="flex items-center mb-4">
        <div className="mr-4">{icon}</div>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.div
        className="mt-4 flex justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: isExpanded ? 180 : 0 }}
      >
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </motion.div>
    </motion.div>
  );
}

export default Home;