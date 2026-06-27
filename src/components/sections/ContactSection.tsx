import React, { useState } from 'react';
import { Button, Input, Textarea } from '@/components/common';
import { emailService } from '@/services/emailService';
import { isValidEmail } from '@/utils/helpers';
import { CONTACT_EMAIL } from '@/constants/config';
import { Mail, CheckCircle, AlertCircle, Send, Phone, MapPin } from 'lucide-react';
import { useScrollReveal } from '@/hooks';
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
  const { ref, isVisible } = useScrollReveal();

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await emailService.sendContactEmail(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setGeneralError(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { icon: Mail, title: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, color: 'from-accent to-cyan-400' },
    { icon: Phone, title: 'WhatsApp', value: 'Chat with me', href: `https://wa.me/${'+8801234567890'.replace(/\D/g, '')}`, color: 'from-green-400 to-emerald-400' },
    { icon: MapPin, title: 'Location', value: 'Bangladesh', href: '#', color: 'from-purple-400 to-pink-400' },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-slate-900/50 to-primary" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="container-custom relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 mb-6">
            <Mail size={14} />
            Contact
          </span>
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's bring your vision to life
          </p>
        </div>

        <div className={`grid sm:grid-cols-3 gap-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          {contactCards.map(({ icon: Icon, title, value, href, color }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group glass-card p-6 text-center hover:border-accent/30 hover:-translate-y-1 transition-all duration-500"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                <div className="w-full h-full rounded-xl bg-primary flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
              <p className="text-gray-400 text-sm">{value}</p>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '300ms' }}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Let's work together
            </h3>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you! Fill out the form or reach out directly.
            </p>

            <div className="space-y-4">
              <div className="glass-card p-5 flex items-center gap-4 group hover:border-accent/30 transition-all duration-500">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail className="text-accent" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email me at</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-white font-medium hover:text-accent transition-colors text-sm">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="glass-card p-5 flex items-center gap-4 group hover:border-green-500/30 transition-all duration-500">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Phone className="text-green-400" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Or call/WhatsApp</p>
                  <a href={`https://wa.me/${'+8801234567890'.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-green-400 transition-colors text-sm">
                    +880 1234 567890
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
            <div className="glass-card p-8">
              {submitted && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex gap-3 items-start animate-fadeInDown">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-green-300 mb-1">Message Sent!</h4>
                    <p className="text-green-200/70 text-sm">Thank you! I'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {generalError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start animate-fadeInDown">
                  <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-red-300 mb-1">Error</h4>
                    <p className="text-red-200/70 text-sm">{generalError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Full Name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} error={errors.name} required />
                <Input label="Email Address" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} error={errors.email} required />
                <Input label="Subject" name="subject" type="text" placeholder="Project Inquiry" value={formData.subject} onChange={handleChange} error={errors.subject} required />
                <Textarea label="Message" name="message" placeholder="Tell me about your project..." rows={5} value={formData.message} onChange={handleChange} error={errors.message} characterCount maxLength={2000} required />

                <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full group">
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
