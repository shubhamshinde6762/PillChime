// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext"; // Import the AuthProvider
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute"; // Component for protecting routes

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protecting dashboard route */}
//           <Route path="/dashboard" element={<PrivateRoute />}>
//             <Route path="" element={<Dashboard />} />
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
import About from './components/About';
import Pricing from './components/Pricing';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import PrivateRoute from './components/PrivateRoute.js';
import ImageUpload from './components/ImageUpload.js';
import PrescriptionManagement from './components/PrescriptionManagement.js';
import UserProfile from './components/UserProfile.js';
import Mealtimes from './components/Mealtimes.js';
// import Chatbot from './components/Chatbot.js';

// import Contact from './components/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence >
          <Routes>
            {/* Layout component wrapping nested routes */}
            <Route path="/" element={<Layout />}>
              {/* Default route when accessing "/" */}
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              {/* <Route path="pricing" element={<Pricing />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
             
              <Route path="/image-upload" element={<ImageUpload />} />
              <Route path="/prescriptions" element={<PrescriptionManagement />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/mealtimes" element={<Mealtimes />} />
              {/* <Route path="/chatbot" element={<Chatbot />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}

              {/* Private routes can be protected as needed */}
             
              {/* <PrivateRoute path="/alexa-linking" element={<AlexaLinking />} />
              <PrivateRoute path="/skills" element={<SkillManagement />} />
              <PrivateRoute path="/reminders" element={<ReminderManagement />} />
              <PrivateRoute path="/image-upload" element={<ImageUpload />} /> */}
            </Route>
            <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
             
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;