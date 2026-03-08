import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming form data
    const body = await req.json();
    
    // We extract 'service' here because that usually represents the "Enquiry Section"
    // If your frontend sends it as 'subject', we check for that too.
    const { fullName, email, phoneCode, phone, service, subject, message } = body;

    // 2. Create the Dynamic Subject Line
    // This ensures the subject line reads like: "New Inquiry: Wealth Management - John Doe"
    const enquiryType = service || subject || 'General Inquiry';
    const dynamicSubject = `New Inquiry: ${enquiryType} - ${fullName}`;

    // 3. Setup Email Transporter (Gmail)
    // Make sure EMAIL_USER and EMAIL_PASS are set in Vercel Environment Variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, // Use your 16-digit App Password, not login password
      },
    });

    // 4. Configure Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER, // The admin email receiving these alerts
      subject: dynamicSubject, // <--- THIS IS THE DYNAMIC SUBJECT
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; color: #333; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-top: 4px solid #C6A87C; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <h2 style="color: #1a1a1a; margin-top: 0;">New Website Inquiry</h2>
            <p style="color: #666; font-size: 14px;">You have received a new message from the <strong>De-Just Kreativ</strong> website contact form.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #555;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${phoneCode || ''} ${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Enquiry Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #C6A87C; font-weight: bold;">${enquiryType}</td>
              </tr>
            </table>

            <div style="margin-top: 25px;">
              <h3 style="color: #333; border-bottom: 2px solid #C6A87C; padding-bottom: 5px; display: inline-block;">Message:</h3>
              <p style="background-color: #f4f4f4; padding: 15px; border-radius: 4px; line-height: 1.6; color: #444; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
              <p>&copy; 2026 De-Just Creative Automated System</p>
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