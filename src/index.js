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



// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: true, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: 'testing1@test.com',
//     pass: 'jn7jnAPss4f63QBp6D',
//   },
// });

// // Define an endpoint to send emails
// app.post('/send-email', async (req, res) => {
//   try {
//     const { to, subject, text, html } = req.body;

//     // Send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
//       to: to, // List of receivers
//       subject: subject,
//       text: text,
//       html: html,
//     });

//     console.log('Message sent: %s', info.messageId);
//     res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });


const Port = process.env.Port || 5000 ;

app.listen(Port, () => console.log(`Server Running on Port ${Port}...`));