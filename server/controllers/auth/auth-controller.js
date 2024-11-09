const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const User = require("../../models/User");
const sendEmail = require("../../utils/sendEmail"); 

// Register user
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email! Please try again.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    console.log("Generated Hashed Password:", hashPassword);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    console.log("User registered successfully:", newUser); 
    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration",
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log('logins => ', req.body)
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET_KEY, 
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.error("Login error: ", e.message);  
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};


// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;   

  const resetToken = crypto.randomBytes(32).toString("hex"); 
  const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  try {
    const user = await User.findOne({ email });
    if (user) {
      const result = await User.updateOne({
        where: { email },
        data: {
          resetPasswordToken,
        }
      })
    }
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate a new reset token if no valid token exists
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetPasswordToken}`;
    const message = `You requested to reset your password. Click the Button to reset.`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
      token: resetPasswordToken
    });

    res.status(200).json({ success: true, message: "Reset link sent to your email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ success: false, message: "An error occurred while sending reset email." });
  }
};

// Reset password

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken, 
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { password } = req.body;
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ success: false, message: "An error occurred while resetting password." });
  }
};


// Logout user
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error: ", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, authMiddleware };
