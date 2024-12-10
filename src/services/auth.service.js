const OTP = require("../models/otp.model");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = (mobileNumber, otp) => {
    console.log(`Sending OTP ${otp} to ${mobileNumber}`);
    return Promise.resolve();
};

exports.generateAndSendOTP = async (mobileNumber) => {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.create({
        mobileNumber,
        otp,
        expiresAt
    })
    await sendOTP(mobileNumber, otp);
    return otp;
};

exports.verifyOTP = async (mobileNumber, otp) => {
    const record = await OTP.findOne({ mobileNumber, otp });

    if (!record) {
        throw new Error('Invalid OTP');
    }

    if (record.expiresAt < new Date()) {
        await OTP.deleteOne({ _id: record._id }); // Remove expired OTP
        throw new Error('OTP has expired');
    }

    // OTP is valid, delete it after successful verification
    await OTP.deleteOne({ _id: record._id });

    return true;
};
