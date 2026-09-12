import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pickupRoutes from './routes/pickup.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration to allow local frontend Vite dev server
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

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
