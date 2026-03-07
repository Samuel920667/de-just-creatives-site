// src/app/api/apply/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract text fields
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const position = formData.get('position');
    const portfolio = formData.get('portfolio');
    const coverMessage = formData.get('coverMessage');
    
    // Extract the file
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No resume uploaded' }, { status: 400 });
    }

    // Convert file to Buffer for Nodemailer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Setup Transporter (Uses same credentials as Contact form)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Configure Email with Attachment
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `Job Application: ${position} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #B59458;">New Job Application</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Portfolio:</strong> ${portfolio || 'N/A'}</p>
          <hr />
          <h3>Cover Message:</h3>
          <p>${coverMessage}</p>
        </div>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Application sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ message: 'Failed to send application' }, { status: 500 });
  }
}