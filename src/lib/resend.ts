import nodemailer from 'nodemailer';

/**
 * Email transport — Gmail SMTP (via nodemailer).
 *
 * We moved off the Resend API to Gmail SMTP with a Google App Password.
 * The `info@saudieventmanagement.com` identity is a verified "Send mail as"
 * alias inside the Gmail account below, so mail leaves with that From address.
 * Inbound mail + aliases are handled separately by ImprovMX.
 *
 * The `resend` object below keeps the old `resend.emails.send(...)` shape on
 * purpose so existing routes (contact, consultation, newsletter, digest, …)
 * keep working without edits — only the transport underneath changed.
 *
 * Required env vars:
 *   SMTP_HOST  (e.g. smtp.gmail.com)
 *   SMTP_PORT  (465 for SSL, 587 for STARTTLS)
 *   SMTP_USER  (the real Gmail account, e.g. infosaudieventmanagement@gmail.com)
 *   SMTP_PASS  (Google App Password — NOT the normal account password)
 */

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = (process.env.SMTP_USER || '').trim();
const SMTP_PASS = (process.env.SMTP_PASS || '').replace(/\s+/g, ''); // app passwords are shown with spaces

// True only when real SMTP credentials are present.
export const isResendConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

// A single reusable transporter (created lazily so a missing config doesn't crash import).
let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for 587 (STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

type SendArgs = {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
};

/**
 * Drop-in replacement for `resend.emails.send()`. Returns the same
 * `{ data, error }` shape the callers already handle.
 */
export const resend = {
  emails: {
    async send({ from, to, subject, html, text, replyTo }: SendArgs) {
      try {
        const info = await getTransporter().sendMail({
          from,
          to,
          subject,
          html,
          text,
          replyTo,
        });
        return { data: { id: info.messageId }, error: null as null };
      } catch (error) {
        return { data: null, error };
      }
    },
  },
};

// Where team/admin notifications are sent.
export const ADMIN_EMAIL = 'infosaudieventmanagement@gmail.com';

// Sending identity (verified "Send mail as" alias in the Gmail account).
export const FROM_EMAIL = 'Saudi Event Management <info@saudieventmanagement.com>';
