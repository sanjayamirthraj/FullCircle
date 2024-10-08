// pages/api/send-email.js

import formData from 'form-data';
import Mailgun from 'mailgun.js';

export default async function handler(req, res) {
    const { email, text, html, subject } = req.body

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY,
    });

    try {
        const msg = await mg.messages.create('sandbox17e768f0e68149d398f8ca4ba06c9fd8.mailgun.org', {
            from: "Excited User <mailgun@sandbox17e768f0e68149d398f8ca4ba06c9fd8.mailgun.org>",
            to: [email],
            subject: subject,
            text: text,
            html: html,
        });
        console.log('Email sent:', msg);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
}
