import React, { useState } from 'react';
import { Button, Input, Textarea } from '@/components/common';
import { emailService } from '@/services/emailService';
import { isValidEmail } from '@/utils/helpers';
import { Mail, CheckCircle, AlertCircle, Send } from 'lucide-react';
import type { ContactFormData } from '@/types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [generalError, setGeneralError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await emailService.sendContactEmail(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      setGeneralError(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-gradient-to-b from-primary to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <h2 className="section-title text-center gradient-text">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start stagger">
          {/* Contact Info */}
          <div className="animate-fadeInUp">
            <h3 className="text-2xl font-bold text-white mb-6">Let's work together</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you! Fill out the form or reach out directly.
            </p>

            {/* Contact Details with animations */}
            <div className="space-y-6 stagger">
              <div className="group p-6 rounded-lg bg-gradient-to-br from-secondary/50 to-slate-900/50 border border-gray-700/50 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="text-accent group-hover:text-cyan-400 transition-colors" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 group-hover:text-accent transition-colors">Email</h4>
                    <a
                      href="mailto:your-email@example.com"
                      className="text-gray-400 hover:text-accent transition-colors"
                    >
                      your-email@example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {submitted && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 rounded-lg flex gap-3 items-start animate-slideDown">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-green-300 mb-1">Message Sent!</h4>
                  <p className="text-green-200 text-sm">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </div>
              </div>
            )}

            {generalError && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg flex gap-3 items-start animate-slideDown">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-red-300 mb-1">Error</h4>
                  <p className="text-red-200 text-sm">{generalError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                label="Subject"
                name="subject"
                type="text"
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                required
              />

              <Textarea
                label="Message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                characterCount
                maxLength={2000}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full group"
              >
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
