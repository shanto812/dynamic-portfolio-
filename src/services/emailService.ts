import type { ContactFormData } from '@/types';

export const emailService = {
  // Send contact form email
  sendContactEmail: async (formData: ContactFormData): Promise<void> => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  },

  // Send contact email via Resend (for Vercel serverless)
  sendViaResend: async (formData: ContactFormData): Promise<void> => {
    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'your-email@example.com',
          from: 'noreply@portfolio.com',
          subject: `New Contact Form Submission: ${formData.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  },
};
