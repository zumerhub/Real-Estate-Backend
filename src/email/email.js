const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "06bc4a3971e2ef",
    pass: "38371cc054285b",
  },
});

const forgotPasswordEmail = async (data) => {
  await transport.sendMail({
    from: "<Technicalsupport@test.com>", // sender address
    to: data.email, // list of receivers
    // to: req.body.email, // list of receivers
    subject: data.subject, // Subject line
    text: "You requested a password reset!!", // plain text body
    html: `
      <p>You requested a password reset!</p> 
      <p>Click this <a href="http://localhost:5001/reset/${data.token}">link</a> to set a new password.</p>
    `,
  });
};

const sendResetPasswordEmail = async (data) => {
  await transport.sendMail({
    from: "<Technicalsupport@test.com>", // sender address
    to: data.email, // list of receivers
    // to: req.body.email, // list of receivers
    subject: data.subject, // Subject line
    text: "You requested a password reset Confirmation!!!", // plain text body
    html: `
      <p>You requested a password reset!</p> 
      <p>Click this <a href="http://localhost:5001/reset/${data.token}">link</a> to set a new password.</p>
    `,
  });
};

module.exports = { forgotPasswordEmail, sendResetPasswordEmail };
