// Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

// Import route handlers
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes')

// Import Redis Session Store
const {redisStore} = require('./sessions/RedisStore');

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI}`)
const db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB'))
db.on('error', (error) => console.error(error.message))

// Initialize express app
const app = express();

// Middleware
// app.use(cors)
app.use(express.json())
app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 15*60*1000} // 15 minutes
}));

// Root route
app.get('/', (req, res) => res.send("Hello, welcome to your server"));

// Auth
app.use('/auth', authRoutes);

// Routes

// To get a course
app.use('/courses', courseRoutes)

// Admin - To add courses
app.use('/admin', adminRoutes);

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
