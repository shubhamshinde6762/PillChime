import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { ref: navRef, inView: navInView } = useInView({
    threshold: 0.1,  // Trigger when 10% of the navbar is visible
    triggerOnce: true,
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: -50 }}
      animate={navInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center"
            drag
            dragConstraints={{ left: -50, right: 50, top: -10, bottom: 10 }}  // Drag constraints for interactivity
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to="/" className="font-bold text-2xl cursor-pointer">
              AlexaSkillHub
            </Link>
          </motion.div>
          <div className="hidden md:block">
            <motion.div className="ml-10 flex items-baseline space-x-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              {currentUser ? (
                <>
                  <DraggableNavLink to="/dashboard">Dashboard</DraggableNavLink>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={handleLogout}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}
            </motion.div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/" toggleMenu={toggleMenu}>Home</MobileNavLink>
          <MobileNavLink to="/about" toggleMenu={toggleMenu}>About</MobileNavLink>
          <MobileNavLink to="/pricing" toggleMenu={toggleMenu}>Pricing</MobileNavLink>
          <MobileNavLink to="/contact" toggleMenu={toggleMenu}>Contact</MobileNavLink>
          {currentUser ? (
            <>
              <MobileNavLink to="/dashboard" toggleMenu={toggleMenu}>Dashboard</MobileNavLink>
              <button
                onClick={() => { handleLogout(); toggleMenu(); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileNavLink to="/login" toggleMenu={toggleMenu}>Login</MobileNavLink>
              <MobileNavLink to="/register" toggleMenu={toggleMenu}>Register</MobileNavLink>
            </>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}

function NavLink({ to, children }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Link
        to={to}
        className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors font-medium"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function MobileNavLink({ to, children, toggleMenu }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors"
      onClick={toggleMenu}
    >
      {children}
    </Link>
  );
}

// Draggable NavLink
function DraggableNavLink({ to, children }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -10, bottom: 10 }} // Allow dragging within the range
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link
        to={to}
        className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer"
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default Navbar;
