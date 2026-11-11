import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const OTP_PURPOSE_TEXT = {
  login: 'log in to your account',
  register: 'verify your email and create your account',
};

// Emails a 6-digit OTP for login / registration.
export async function sendOtpEmail(to, otp, purpose) {
  const action = OTP_PURPOSE_TEXT[purpose] || 'continue';
  await transporter.sendMail({
    from: `"Samraj Infra" <${process.env.GMAIL_USER}>`,
    to,
    subject: `${otp} is your Samraj Infra verification code`,
    text: `Your OTP to ${action} is ${otp}. It is valid for 10 minutes. Do not share it with anyone. If you did not request this, please ignore this email.`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#2a160b">
        <h2 style="margin:0 0 8px">Samraj Infra</h2>
        <p style="margin:0 0 20px;color:#475569">Use this code to ${action}:</p>
        <div style="font-size:32px;font-weight:bold;letter-spacing:8px;background:#fbf3ea;border:1px solid #efdcc6;border-radius:8px;padding:16px;text-align:center">${otp}</div>
        <p style="margin:20px 0 0;color:#475569;font-size:13px">This code is valid for 10 minutes. Do not share it with anyone.</p>
        <p style="margin:8px 0 0;color:#94a3b8;font-size:12px">If you did not request this, you can safely ignore this email.</p>
      </div>`,
  });
}
