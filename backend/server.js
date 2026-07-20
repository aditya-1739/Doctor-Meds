import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes — imported at top (ES module best practice)
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import adminRouter from './routes/admin.js';
import doctorRouter from './routes/doctor.js';
import patientRouter from './routes/patient.js';

dotenv.config();

// ─── Env Validation ───────────────────────────────────────────────────────────
const REQUIRED_ENV = ['MONGODB_URI', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`\n❌ Missing required environment variables: ${missing.join(', ')}`);
  console.error('   Please set them in your .env file or hosting dashboard.\n');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ─── CORS Config ──────────────────────────────────────────────────────────────
// In production: only allow the deployed frontend URL.
// In development: also allow localhost variants.
const allowedOrigins = [];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

if (NODE_ENV !== 'production') {
  allowedOrigins.push(
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
  );
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin '${origin}' not allowed`));
  },
  credentials: true,
};

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// ─── MongoDB Connection ───────────────────────────────────────────────────────
// useNewUrlParser and useUnifiedTopology are deprecated since Mongoose 6 — removed.
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`✅ Connected to MongoDB [${NODE_ENV}]`))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// ─── Health Check ─────────────────────────────────────────────────────────────
// Required by render.yaml healthCheckPath — must return 200.
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', env: NODE_ENV });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/patient', patientRouter);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Doctor-Meds Hospital Management API', status: 'running' });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route '${req.method} ${req.path}' not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  if (err.message.startsWith('CORS')) {
    return res.status(403).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} [${NODE_ENV}]`);
});