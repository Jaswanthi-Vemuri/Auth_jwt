// backend/Routes/OTPRouter.js
const router = require('express').Router();
const { requestOTP, verifyOTP } = require('../Controllers/OTPController');

router.post('/request', requestOTP);   // POST /otp/request { email }
router.post('/verify', verifyOTP);     // POST /otp/verify { email, otp }

module.exports = router;
