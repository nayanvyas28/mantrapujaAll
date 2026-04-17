const express = require('express');
const router = express.Router();

const {
    initiateRegister,
    verifyOtp,
    initiateForgotPassword,
    checkLoginVerification,
    verifyLoginAuth,
    checkUser,
    updateProfile
} = require('../controllers/auth');

// 0. Pre-Check for user existence
router.get('/check-user', checkUser);

// 1. Initial Registration -> Generates OTP & Unverified User
router.post('/register', initiateRegister);

// Removed redundant finalizeRegister reference

// 2. Verify OTP for Register or Reset (Handles both)
// For RESET: Provide generic or specific endpoint? We'll make it generic.
router.post('/verify-otp', verifyOtp);

// 3. Initiate Forgot Password
router.post('/forgot-password', initiateForgotPassword);

// 4. Pre-login verification check middleware hook (or standalone endpoint)
// Usually the client calls this before standard Supabase SignIn, or as part of a proxy endpoint
// For simplicity we create an endpoint to handle unverified users logging in.
router.post('/check-verification', checkLoginVerification, (req, res) => {
    // If it reaches here, phone was verified or not checked (so it's ok)
    res.json({ verified: true });
});

router.post('/verify-login-otp', verifyLoginAuth);
router.post('/update-profile', updateProfile);

module.exports = router;
