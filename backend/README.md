# Backend-Template-Node.js

This repository provides a template for building a Node.js backend application using Express. It includes commonly used middlewares and configurations to help you quickly set up your server.

## Features

- Environment variable management with `dotenv`
- Secure HTTP headers with `helmet`
- Rate limiting to prevent abuse
- Cross-Origin Resource Sharing (CORS) support
- Request logging with `morgan`, including file rotation
- Centralized error handling
- MongoDB integration with Mongoose
- Basic routing setup

## Prerequisites

- Node.js (>= 20.x)
- npm (>= 10.x)
- MongoDB Atlas or another MongoDB instance

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OS03Bit/Backend-Template-Node.js.git
   cd Backend-Template-Node.js

2. Install the dependencies:
   ```bash
   npm install

3. Create a .env file in the root of the project and add your environment variables:
   ```bash
   PORT= 
   MONGODB_ATLAS= ""

4. Start the server:
   ```bash
   npm start

## Project Structure
```

├── configs
│   └── Databases
│       └── MongoDBAtlas.js      # MongoDB connection setup
├── controllers
│   └── homeController.js        # Controller for handling home and 404 routes
├── middlewares
│   └── errorHandler.js          # Centralized error handling middleware
├── models
│   └── exampleModel.js          # Example Mongoose model
├── routes
│   └── index.js                 # Route definitions
├── logs                         # Directory for log files
│   └── access.log               # Access log file (rotated weekly)
├── .env                         # Environment variables file (not included in the repo)
├── .gitignore                   # Git ignore file
├── index.js                     # Entry point of the application
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation


