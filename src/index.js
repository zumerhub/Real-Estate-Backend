const express = require('express');
// const nodemailer = require('nodemailer');

// const adminRoutes = require('./routes/admin.routes.js');
const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes.js');
const estateRoutes = require('./routes/estate.routes.js');
const userRoutes = require('./routes/user.routes.js');

require('dotenv').config()
require('./database/database.js');

const app = express();

app.use(express.json());

// app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', bookingRoutes);
app.use('/api', estateRoutes);
app.use('/api', userRoutes);

app.get('/hello', (req, res) => {
res.send('Running server!!!!!!!!')
})


const Port = process.env.Port || 5000 ;

app.listen(Port, () => console.log(`Server Running on Port ${Port}...`));