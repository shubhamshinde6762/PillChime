// import React from "react";
// import { motion } from "framer-motion";

// function Pricing() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       className="container mx-auto px-4 py-8"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.h1
//         className="text-3xl font-bold mb-8 text-center"
//         variants={itemVariants}
//       >
//         Pricing Plans
//       </motion.h1>
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-3 gap-8"
//         variants={itemVariants}
//       >
//         <PricingCard
//           title="Basic"
//           price="$9.99"
//           features={[
//             "1 Alexa device",
//             "10 skills",
//             "50 reminders",
//             "Basic support",
//           ]}
//         />
//         <PricingCard
//           title="Pro"
//           price="$19.99"
//           features={[
//             "3 Alexa devices",
//             "Unlimited skills",
//             "200 reminders",
//             "Priority support",
//             "Advanced analytics",
//           ]}
//           highlighted={true}
//         />
//         <PricingCard
//           title="Enterprise"
//           price="Custom"
//           features={[
//             "Unlimited Alexa devices",
//             "Unlimited skills",
//             "Unlimited reminders",
//             "24/7 premium support",
//             "Custom integrations",
//             "Dedicated account manager",
//           ]}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// function PricingCard({ title, price, features, highlighted = false }) {
//   return (
//     <motion.div
//       className={`bg-white p-6 rounded-lg shadow-md ${
//         highlighted ? "border-4 border-blue-500" : "border"
//       } transition-all duration-300 transform hover:scale-105`}
//       variants={itemVariants}
//     >
//       <h2 className="text-xl font-semibold mb-4">{title}</h2>
//       <p className="text-2xl font-bold mb-6">{price}</p>
//       <ul className="mb-6 space-y-2">
//         {features.map((feature, index) => (
//           <li key={index} className="text-gray-700">
//             {feature}
//           </li>
//         ))}
//       </ul>
//       <button
//         className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
//           highlighted ? "bg-blue-500" : "bg-gray-800"
//         } hover:bg-opacity-90`}
//       >
//         Choose Plan
//       </button>
//     </motion.div>
//   );
// }

// export default Pricing;
