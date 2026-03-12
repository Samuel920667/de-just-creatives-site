import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming form data
    const body = await req.json();
    
    // Extract variables
    const { fullName, email, phoneCode, phone, service, subject, message } = body;

    // 2. Create the Dynamic Subject Line
    const enquiryType = service || subject || 'General Inquiry';
    const dynamicSubject = `New Inquiry: ${enquiryType} - ${fullName}`;

    // 3. Setup Email Transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 4. Configure Email Content (PREMIUM FINTECH STYLING)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: dynamicSubject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; padding: 40px 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">

            <div style="background-color: #1a1a1a; padding: 30px 40px; text-align: left; border-bottom: 4px solid #C6A87C;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">DE-JUST <span style="color: #C6A87C;">KЯEATIV</span></h1>
              <p style="color: #a0a0a0; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Financials</p>
            </div>

            <div style="padding: 40px;">
              <h2 style="color: #111827; font-size: 20px; margin-top: 0; margin-bottom: 8px;">New Consultation Request</h2>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-top: 0; margin-bottom: 35px;">
                A new inquiry has been securely submitted through the website. Below are the details of the request.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; width: 35%; color: #6b7280; font-size: 14px; font-weight: 500;">Client Name</td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 600;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; font-weight: 500;">Email Address</td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 600;">
                    <a href="mailto:${email}" style="color: #C6A87C; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; font-weight: 500;">Phone Number</td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 600;">${phoneCode || ''} ${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; font-weight: 500;">Enquiry Type</td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 15px; font-weight: 600;">
                    <span style="background-color: #fdf6e3; color: #9c782b; padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 700;">
                      ${enquiryType}
                    </span>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 40px;">
                <p style="color: #6b7280; font-size: 14px; font-weight: 500; margin-bottom: 12px; margin-top: 0;">Message</p>
                <div style="background-color: #f9fafb; border-left: 4px solid #C6A87C; padding: 24px; border-radius: 0 8px 8px 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
              </div>

            </div>

            <div style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">Securely processed by De-Just Creative Financials.</p>
              <p style="color: #9ca3af; font-size: 13px; margin: 6px 0 0 0;">&copy; 2026 All rights reserved.</p>
            </div>

          </div>
        </div>
      `,
    };

    // 5. Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}