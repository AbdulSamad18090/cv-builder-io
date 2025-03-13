import nodemailer from "nodemailer";
import { randomInt } from "crypto";

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or any SMTP service you use
    auth: {
      user: process.env.SMTP_USER, // Your SMTP user
      pass: process.env.SMTP_PASSWORD, // Your SMTP password
    },
  });

  const mailOptions = {
    from: `"Support Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your OTP for Password Reset",
    html: `
      <html>
        <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #fdf2f8;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 30px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                border-top: 5px solid #E11D48;
            }
            .email-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .email-header img {
                width: 100px;
            }
            .email-title {
                font-size: 24px;
                color: #E11D48;
                font-weight: bold;
                text-align: center;
                margin-bottom: 10px;
            }
            .email-subtitle {
                font-size: 14px;
                color: #777777;
                text-align: center;
                margin-bottom: 20px;
            }
            .otp-container {
                text-align: center;
                font-size: 32px;
                font-weight: bold;
                color: #ffffff;
                background-color: #E11D48;
                margin: 20px 0;
                padding: 15px;
                border-radius: 8px;
                letter-spacing: 2px;
            }
            .email-footer {
                text-align: center;
                font-size: 12px;
                color: #888888;
                margin-top: 30px;
            }
            .footer-link {
                color: #E11D48;
                text-decoration: none;
                font-weight: bold;
            }
            </style>
        </head>
        <body>
            <div class="email-container">
            <div>
                <div class="email-title">Password Reset OTP</div>
                <div class="email-subtitle">
                We received a request to reset your password. Use the OTP below to proceed.
                </div>
                <div class="otp-container">
                ${otp}
                </div>
                <div class="email-subtitle">
                This OTP is valid for the next 10 minutes. If you did not request a password reset, please ignore this email.
                </div>
            </div>
            <div class="email-footer">
                <p>If you have any questions, feel free to contact our support team.</p>
                <p><a href="https://your-website.com" class="footer-link">Visit our website</a></p>
            </div>
            </div>
        </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Function to generate a random 5-digit OTP
const generateOtp = () => {
  return randomInt(10000, 99999).toString();
};

export async function POST(req) {
  const { email } = await req.json(); // Parse the request body to get the email

  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
    });
  }

  const otp = generateOtp(); // Generate a new OTP

  try {
    // Send OTP email to the user
    await sendOtpEmail(email, otp);

    // Return success response
    return new Response(
      JSON.stringify({ message: "OTP sent successfully", otp }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(JSON.stringify({ error: "Failed to send OTP" }), {
      status: 500,
    });
  }
}
