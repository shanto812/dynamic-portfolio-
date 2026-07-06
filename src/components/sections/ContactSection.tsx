import React, { useState } from 'react';
import { Button, Input, Textarea } from '@/components/common';
import { emailService } from '@/services/emailService';
import { isValidEmail } from '@/utils/helpers';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER } from '@/constants/config';
import { Mail, CheckCircle, AlertCircle, Send, Phone, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
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
    { icon: Mail, title: 'Email Address', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Phone, title: 'Instant Messenger', value: CONTACT_PHONE_DISPLAY, href: `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}` },
    { icon: MapPin, title: 'Current HQ', value: 'Dhaka, Bangladesh', href: '#' },
  ];

  return (
    <section id="contact" className="relative bg-[#040404] py-32 px-4 overflow-hidden">
      
      {/* Cinematic Ambient Background Fields */}
      <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#FD1D1D]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-[#FCB045]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#040404_90%)] pointer-events-none" />

      <div className="max-w-[1750px] mx-auto relative z-10">
        
        {/* Section Header with Dynamic Asymmetric Reveal */}
        <div ref={ref} className={`mb-24 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800/80 mb-5 backdrop-blur-md">
            <Sparkles size={12} className="text-[#FCB045]" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">Get In Touch</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Let’s design <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD1D1D] via-[#FCB045] to-[#FD1D1D] bg-[length:200%_auto] animate-pulse">new standards.</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-md md:justify-self-end">
              Have an ambitious vision, platform deployment, or premium creative infrastructure to map out? Drop a transmission below.
            </p>
          </div>
        </div>

        {/* 3-Column Luxury Vector-Linked Grid */}
        <div 
          className={`grid sm:grid-cols-3 gap-6 mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
          style={{ transitionDelay: '150ms' }}
        >
          {contactCards.map(({ icon: Icon, title, value, href }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative bg-[#090909]/40 backdrop-blur-xl border border-neutral-900 p-6 rounded-2xl flex flex-col justify-between h-40 transition-all duration-500 hover:border-neutral-800 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black"
            >
              {/* Corner accent glow lines */}
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-r from-transparent to-neutral-800 group-hover:to-[#FCB045]/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-gradient-to-b from-transparent to-neutral-800 group-hover:to-[#FD1D1D]/50 transition-all duration-500" />

              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800/60 flex items-center justify-center group-hover:border-neutral-700/60 transition-colors">
                  <Icon size={16} className="text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-[#FCB045] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>

              <div>
                <h4 className="text-[11px] font-semibold text-neutral-500 tracking-wider uppercase mb-1">{title}</h4>
                <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors truncate">{value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Master Split Structure */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Premium Meta Text Block */}
          <div className={`lg:col-span-5 space-y-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '250ms' }}>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-tight">
                Global Collaboration <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD1D1D] to-[#FCB045]">Hub Active.</span>
              </h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                Whether expanding technical ecosystems, scaling branding guidelines, or initiating bespoke engineering tasks, I ensure absolute product precision from discovery to delivery.
              </p>
            </div>
            
            <div className="h-[1px] bg-gradient-to-r from-neutral-900 via-transparent to-transparent w-full" />
            
            {/* Status Micro-node */}
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-neutral-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>SLOTS AVAILABLE FOR Q3 2026</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Fluid Canvas Form */}
          <div className={`lg:col-span-7 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '350ms' }}>
            <div className="relative bg-[#080808]/80 border border-neutral-900/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl">
              
              {/* Success Alert Banner */}
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3 items-center animate-fadeIn">
                  <CheckCircle className="text-emerald-400 flex-shrink-0" size={16} />
                  <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Payload successfully submitted.</p>
                </div>
              )}

              {/* Error Alert Banner */}
              {generalError && (
                <div className="mb-6 p-4 bg-red-500/5 border border-red-500/10 rounded-xl flex gap-3 items-center animate-fadeIn">
                  <AlertCircle className="text-red-400 flex-shrink-0" size={16} />
                  <p className="text-xs font-mono text-red-400 uppercase tracking-wider">{generalError}</p>
                </div>
              )}

              {/* Form Architecture */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Your Name" name="name" type="text" placeholder="Identity / Brand" value={formData.name} onChange={handleChange} error={errors.name} required />
                  <Input label="Your Email" name="email" type="email" placeholder="name@domain.com" value={formData.email} onChange={handleChange} error={errors.email} required />
                </div>
                <Input label="Subject Matrix" name="subject" type="text" placeholder="Project Alignment Type" value={formData.subject} onChange={handleChange} error={errors.subject} required />
                <Textarea label="Message Framework" name="message" placeholder="Describe the comprehensive specs of your project idea..." rows={4} value={formData.message} onChange={handleChange} error={errors.message} characterCount maxLength={2000} required />

                {/* Kinetic Luxury Interactive Action Button */}
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  isLoading={loading} 
                  className="w-full py-4 rounded-xl font-bold tracking-widest text-xs text-white uppercase relative overflow-hidden transition-all duration-500 shadow-xl shadow-[#FD1D1D]/5 hover:shadow-[#FCB045]/15 transform hover:-translate-y-0.5 active:translate-y-0 group"
                  style={{
                    background: 'linear-gradient(135deg, #FD1D1D, #FCB045)'
                  }}
                >
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <span>Initialize Project</span>
                    <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </Button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};