// backend/OTP/generateOTP.js
const otpGenerator = require('otp-generator');
module.exports = function() {
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};
