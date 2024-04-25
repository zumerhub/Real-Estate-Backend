require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;

const bcrypt = require("bcrypt");

// const randomstring = require("randomstring");
const {
  forgotPasswordEmail,
  sendResetPasswordEmail,
} = require("../../email/email");
const {
  createNewUserService,
  findOneUserService,
  findByIdAndUpdateService,
} = require("../auth/auth.service");
const { loginValidation } = require("../auth/auth.validation");
const { createUserValidation } = require("../users/user.validation");
const User = require("../../apps/users/user.schema");
const { timeStamp } = require("console");

const getAllLogin = async (req, res, next) => {
  const allLogins = await User.find().sort("name");
  return res.send(allLogins);
};

const PostRegister = async (req, res, next) => {
  try {
    const { error } = createUserValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // Check if a user with the same email already exists
    const existingUser = await findOneUserService({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send("User already registered");
    }

    // Generate salt with a complexity of 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create a new user instance with the hashed password
    const user = createNewUserService({
      ...req.body,
      password: hashedPassword,
    });
    res.send({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send("Internal server error");
  }
};

const createLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await findOneUserService({ email: req.body.email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const confirmPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!confirmPassword) {
    return res.status(404).send("Invalid login credentials");
  }
  const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return res.send({ token });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //find user by email
    const user = await findOneUserService({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Update user document with reset token
    user.resetToken = resetToken;
    token = resetToken;
    await findByIdAndUpdateService(user._id, user);

    // send forgot password email
    // await forgotPasswordEmail({
    //   email,
    //   subject: "Forgot Password",
    //   token: resetToken,
    // });

    return res.status(200).send({ message: "Password reset email sent successfully", token, timeStamp: new Date ()});
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).send("Internal server error");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    // Validate inputs
    if (!email && !newPassword && !resetToken) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    // Find user by email
    const user = await findOneUserService({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Validate reset token
    if (user.resetToken !== resetToken) {
      return res.status(400).send({ error: "Invalid reset token" });
    }

    // Check token expiration (optional, depending on your implementation)
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: jwtExpiration,
    });
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and reset token in the database
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear the reset token
    await findByIdAndUpdateService(user._id, user);

    
    // Send password reset confirmation email
    // await sendResetPasswordEmail({
    //   email: user.email,
    //   subject: "Password Reset Confirmation",
    //   message: "Your password has been successfully reset.",
    // });

    return res.status(200).send({ message: "Password reset successfully", token });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllLogin,
  PostRegister,
  createLogin,
  forgotPassword,
  resetPassword,
};
