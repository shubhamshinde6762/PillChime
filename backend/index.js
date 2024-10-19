const dotenv = require('dotenv');
const qs = require('qs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const { rateLimit } = require('express-rate-limit');
const NodeCache = require('node-cache');
const { dbConnect } = require('./configs/Databases/MongoDBAtlas');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const helmet = require('helmet');
const axios = require('axios');

// Load environment variables from .env file
dotenv.config();

// Configuration constants
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = ''; // Your redirect URI

// Initialize the express application
const app = express();
const myCache = new NodeCache();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiter Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(limiter);

// Logging setup
const accessLogStream = rfs.createStream('access.log', {
  interval: '7d',
  path: path.join(__dirname, 'logs'),
});
app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: accessLogStream
}));

// OAuth Token Exchange Route
app.post('/api/auth/exchange-code', async (req, res) => {
  const { authCode } = req.body;
  if (!authCode) {
    return res.status(400).json({ error: 'Authorization code is required.' });
  }

  console.log(authCode)

  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code: authCode,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    console.log(tokenResponse)

    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    res.json({ accessToken: access_token, refreshToken: refresh_token, expiresIn: expires_in });
  } catch (error) {
    console.error('Token exchange error:', error.message);
    res.status(500).json({
      error: 'Failed to exchange authorization code.',
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Google Calendar Event Creation Route
app.post('/api/calendar/add-event', async (req, res) => {
  const { accessToken, summary, reminderTime } = req.body;
  if (!accessToken || !summary || !reminderTime) {
    return res.status(400).json({
      error: 'Access token, summary, and reminder time are required.',
    });
  }

  const startDateTime = `${reminderTime}:00`;
  const endDateTime = `${reminderTime}:00`;

  const eventPayload = {
    summary,
    start: { dateTime: startDateTime, timeZone: 'Asia/Kolkata' },
    end: { dateTime: endDateTime, timeZone: 'Asia/Kolkata' },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 10 },
        { method: 'email', minutes: 10 },
      ],
    },
  };

  try {
    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      eventPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Calendar event creation error:', error);
    res.status(500).json({
      error: 'Failed to add event.',
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Use routes defined in the routes module
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running: http://localhost:5000`));
  })
  .catch(err => {
    console.error('Failed to connect to the database. Server not started.', err);
    process.exit(1);
  });