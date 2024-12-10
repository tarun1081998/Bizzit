const authService = require("../services/auth.service")

exports.verifyOtp = async(req, res) => {
    const { mobileNumber, otp } = req.body

    if (!mobileNumber || !otp) {
        return res.status(400).json({ message: 'Mobile number and OTP are required' });
    }

    try {
        const isValid = await authService.verifyOTP(mobileNumber, otp);
        if (isValid) {
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

exports.generateAndSendOtp = async(req, res) => {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
        return res.status(400).json({ message: 'Mobile number is required' });
    }

    try {
        const otp = await authService.generateAndSendOTP(mobileNumber);
        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to send OTP', error });
    }
}