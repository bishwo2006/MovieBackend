const express = require('express');
const cors = require("cors");

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const hallRoutes = require('./routes/halls');
const bookingRoutes = require('./routes/bookings');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ---- CORS FIX ----
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Preflight requests
app.options("/", cors());

// ---- Middleware ----
app.use(express.json());

// ---- Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler
app.use(errorHandler);

module.exports = app;
