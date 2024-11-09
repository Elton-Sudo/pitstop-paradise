const nodemailer = require("nodemailer");
const winston = require("winston");

const sendOrderAlertEmail = async ({ to, subject, orderDetails }) => {
  if (!to) {
    throw new Error("No recipients defined");
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SALES_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Format order details for the email
  const orderItemsHtml = orderDetails
    .map(
      ({ productId, title, image, price, quantity }) => `
        <div style="margin-bottom: 15px;">
          <strong>Reference Number:</strong> ${productId}<br>
          <strong>Product Title:</strong> ${title}<br>
          <strong>Product Image:</strong> <img src="${image}" alt="${title}" style="max-width: 200px;"><br>
          <strong>Quantity:</strong> ${quantity}<br>
          <strong>Total Price:</strong> $${price}<br>
        </div>
      `
    )
    .join("");

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Order Confirmation</h2>
        <p>Thank you for your order!</p>
        <p>Here are your order details:</p>
        ${orderItemsHtml}
        <p>We will notify you once your order has been shipped.</p>
        <p>Thank you for shopping with us!</p>
      </div>
    `,
  };

  // Send order alert to admin
  const sendEmailToAdmin = {
    from: process.env.SENDER_EMAIL,
    to: process.env.SALES_EMAIL,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Order Confirmation</h2>
        <p>New order received!</p>
        <p>Here are the order details:</p>
        ${orderItemsHtml}
        <p>We will notify the customer once the order has been shipped.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(sendEmailToAdmin);
    winston.info(`Order confirmation email sent successfully to: ${to}`);
  } catch (error) {
    winston.error("Error sending order confirmation email:", error);
    throw error;
  }
};

module.exports = sendOrderAlertEmail;
