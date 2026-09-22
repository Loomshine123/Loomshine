import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pickupRoutes from './routes/pickup.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Dynamic CORS configuration for local development & production
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. server-to-server, curl, test scripts)
    if (!origin) return callback(null, true);

    // Allow any localhost or 127.0.0.1 port in local development (e.g. 5173, 5174, 5175, 3000)
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:[0-9]+)?$/.test(origin)) {
      return callback(null, true);
    }

    // Allow explicit production domains if configured in environment
    if (process.env.ALLOWED_ORIGINS && process.env.ALLOWED_ORIGINS.split(',').includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body Parser
app.use(express.json());

// API Routes
app.use('/api', pickupRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'LOOMSHINE Backend API' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, _next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: "We couldn't submit your pickup request right now. Please try again."
  });
});

app.listen(PORT, () => {
  console.log(`[LOOMSHINE Backend] Server running at http://localhost:${PORT}`);
  console.log(`[LOOMSHINE Backend] Target Endpoint: POST http://localhost:${PORT}/api/pickup-booking`);
});
