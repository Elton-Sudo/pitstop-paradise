const nodemailer = require("nodemailer");
const winston = require("winston");

const sendPasswordResetEmail = async ({ to, subject, text, token }) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;

 
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SALES_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SALES_EMAIL,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>${text}</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 15px; background-color: #DF2F89; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Thank you!</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    winston.info("Password reset email sent successfully to:", to);
  } catch (error) {
    winston.error("Error sending email:", error);
  }
};

module.exports = sendPasswordResetEmail;
