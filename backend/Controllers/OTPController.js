const generateOTP = require('../OTP/generateOTP');
const nodemailer = require("nodemailer");
let otpStore = {};

function sendMail(email, otp) {
  // Use environment variables for sensitive info
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,      // your gmail
      pass: process.env.GMAIL_PASS,      // app password, not your Gmail login password!
    },
  });

  let mailOptions = {
    from: `"OTP Service" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`
  };

  return transporter.sendMail(mailOptions);
}

exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const otp = generateOTP();
  otpStore[email] = otp;
  try {
    await sendMail(email, otp);
    res.json({ message: 'OTP sent to your email address.' });
  } catch (err) {
    res.status(500).json({ message: "Error sending email: " + err.message });
  }
};

exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.json({ success: true, message: 'OTP verified!' });
  }
  res.status(401).json({ success: false, message: 'Invalid OTP' });
};
