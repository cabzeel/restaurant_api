const express = require('express');
const router = require('./routes/regular/index');
const admin = require('./routes/admin/adminRouter');
const connectDB = require('./db/connect');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Middleware
const allowedOrigins = [
  'https://comfort237.netlify.app',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(express.json());

//test route
app.get('/', (req, res) => {
  res.send('API is LIVE>>>>');
});

// API Routes
app.use('/api/', router);

//admin routes

app.use('/admin', admin);

// Serve static images and frontend
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Server + DB start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}...`);
});

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

startDB();
