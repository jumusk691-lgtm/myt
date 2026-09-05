import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: 'b80202001@smtp-brevo.com', // Tera Brevo login user
        pass: process.env.BREVO_SMTP_KEY,   // Yeh seedha Vercel se secure key utha lega
      },
    });

    await transporter.sendMail({
      from: '"MYT Trading" <b80202001@smtp-brevo.com>',
      to: email,
      subject: 'Your MYT App Verification OTP',
      text: `Aapka OTP code yeh hai: ${otp}`,
      html: `<h2>MYT Trading App Verification</h2><p>Aapka OTP code hai: <b>${otp}</b></p>`,
    });

    return NextResponse.json({ success: true, message: 'OTP sent successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

