require('dotenv').config();

const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();

client.collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({
  name: 'tripcraft_http_requests_total',
  help: 'Total number of HTTP requests handled by TripCraft.',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDurationSeconds = new client.Histogram({
  name: 'tripcraft_http_request_duration_seconds',
  help: 'HTTP request duration in seconds for TripCraft.',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const route = req.route?.path || req.path;
    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode),
    };
    const durationSeconds = Number(process.hrtime.bigint() - start) / 1e9;

    httpRequestsTotal.inc(labels);
    httpRequestDurationSeconds.observe(labels, durationSeconds);
  });

  next();
});

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trip', require('./routes/tripRoutes'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TripCraft API running 🚀',
    uptime: process.uptime()
  });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: 'Something went wrong!'
  });
});

module.exports = app;