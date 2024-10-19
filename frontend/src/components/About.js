import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">About AlexaSkillHub</h1>
      <p className="text-xl mb-6">
        AlexaSkillHub is your one-stop solution for managing Alexa skills and reminders. 
        Our platform allows you to easily connect your Alexa devices, add new skills, 
        set reminders, and even convert images to voice commands.
      </p>
      <p className="text-xl mb-6">
        Founded in 2023, our mission is to make interaction with Alexa devices 
        as seamless and intuitive as possible. We're constantly innovating to bring 
        you the best Alexa management experience.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TeamMember name="John Doe" role="Founder & CEO" />
        <TeamMember name="Jane Smith" role="CTO" />
        <TeamMember name="Mike Johnson" role="Head of Design" />
      </div>
    </motion.div>
  );
}

function TeamMember({ name, role }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold text-center">{name}</h3>
      <p className="text-gray-600 text-center">{role}</p>
    </div>
  );
}

export default About;