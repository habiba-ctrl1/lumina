import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyName, crNumber, contactName, jobTitle, phone, email,
      primaryCategory, additionalCategories, yearsInOperation,
      primaryCity, portfolioUrl, companyIntro, howHeard,
    } = body;

    if (!companyName || !crNumber || !contactName || !phone || !email || !primaryCategory || !companyIntro) {
      return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
    }

    const year = new Date().getFullYear();
    const ref = `SEM-VND-${year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const additionalList = Array.isArray(additionalCategories) && additionalCategories.length
      ? additionalCategories.join(', ')
      : 'None selected';

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_missing_key') {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Saudi Event Management <info@saudieventmanagement.com>',
        to: ['infosaudieventmanagement@gmail.com'],
        subject: `New Vendor Application — ${companyName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <h2 style="color: #0D6B4E; margin: 0 0 4px 0;">New Vendor Application</h2>
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 24px 0;">Reference: <strong>${ref}</strong></p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px; width: 40%;"><strong>Company Name</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${companyName}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>CR Number</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${crNumber}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Contact Person</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${contactName}${jobTitle ? ` — ${jobTitle}` : ''}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Phone / WhatsApp</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Email</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${email}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Primary Category</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${primaryCategory}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Additional Categories</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${additionalList}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Years in Operation</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${yearsInOperation || '—'}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Primary City</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${primaryCity || '—'}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>Portfolio / Website</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${portfolioUrl || '—'}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #374151; font-size: 14px;"><strong>How They Heard</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${howHeard || '—'}</td></tr>
            </table>

            <div style="background: #f9fafb; border-left: 4px solid #0D6B4E; padding: 16px; margin: 24px 0; border-radius: 4px;">
              <p style="font-size: 13px; color: #6b7280; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.05em;">Company Introduction</p>
              <p style="font-size: 14px; color: #111827; margin: 0; line-height: 1.7;">${companyIntro}</p>
            </div>

            <p style="color: #6b7280; font-size: 12px; margin: 24px 0 0 0;">Reply directly to this email to contact the applicant.</p>
          </div>
        `,
        replyTo: email,
      });
    }

    return NextResponse.json({ success: true, ref }, { status: 201 });
  } catch (error) {
    console.error('Vendor API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: String(error) }, { status: 500 });
  }
}
