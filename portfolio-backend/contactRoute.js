const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("./Contact");

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // 1️⃣ Validate
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "All fields are required.",
    });
  }

  try {
    // 2️⃣ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("💾 Message saved to MongoDB");

    // 3️⃣ Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;
                    background: #1a2332; color: #ffffff; padding: 30px; border-radius: 12px;">
          
          <h2 style="color: #00c5b8; margin-bottom: 24px;">
            📬 New Portfolio Message
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8a9bb0; width: 80px;">Name</td>
              <td style="padding: 10px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a9bb0;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #00c5b8;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8a9bb0; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; line-height: 1.6;">${message}</td>
            </tr>
          </table>

          <hr style="border-color: rgba(0,197,184,0.2); margin: 24px 0;" />

          <p style="color: #8a9bb0; font-size: 12px; margin: 0;">
            Sent from your Portfolio contact form
          </p>
        </div>
      `,
    };

    // 4️⃣ Try sending email (but don't crash if it fails)
    try {
      await transporter.sendMail(mailOptions);
      console.log("📧 Email sent successfully");
    } catch (mailError) {
      console.error("⚠ Email failed:", mailError.message);
    }

    // 5️⃣ Always respond success if DB worked
    res.status(200).json({
      success: true,
      message: "Message saved successfully!",
    });

  } catch (error) {
    console.error("❌ Database Error:", error.message);
    res.status(500).json({
      error: "Database error. Please try again.",
    });
  }
});

module.exports = router;