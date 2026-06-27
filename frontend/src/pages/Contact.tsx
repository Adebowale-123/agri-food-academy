import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import api from '../services/api';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const SOCIAL = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/agri-food-innovation-academy/', color: 'hover:bg-blue-600' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1JDhc5mXyf/', color: 'hover:bg-blue-700' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/p/DW-LoU8iNag/?igsh=aDliZG93cnd4aTRj', color: 'hover:bg-pink-600' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@afiaacademy', color: 'hover:bg-red-600' },
];

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(data: FormData) {
    try {
      setError('');
      await api.post('/messages', data);
      setSent(true);
      reset();
    } catch {
      setError('Failed to send message. Please try again.');
    }
  }

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Contact Us</div>
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-primary-100 text-lg">
            Reach out to our team — we're here to help across Nigeria, Africa and the United Kingdom.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-8">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Our Offices</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wide">🇬🇧 United Kingdom</p>
                      <p className="text-gray-500 text-sm">4, Highgrove Court, Spalding, Lincolnshire</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wide">🇳🇬 Nigeria (Headquarters)</p>
                      <p className="text-gray-500 text-sm">8, Amore Street off Toyin Street, Ikeja</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Email</p>
                  <a href="mailto:team.afiacademy@gmail.com" className="text-gray-500 text-sm hover:text-primary transition-colors">
                    team.afiacademy@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Website</p>
                  <a href="https://www.afiaacademy.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-primary transition-colors">
                    www.afiaacademy.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-primary mb-4">Follow Us on Social Media</h3>
              <div className="flex gap-3">
                {SOCIAL.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-100 text-gray-600 ${color} hover:text-white rounded-xl flex items-center justify-center transition-colors`}
                    title={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
                {/* TikTok */}
                <a
                  href="https://tiktok.com/@afiaacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 text-gray-600 hover:bg-black hover:text-white rounded-xl flex items-center justify-center transition-colors font-bold text-xs"
                  title="TikTok"
                >
                  TT
                </a>
              </div>
            </div>

            {/* Presence */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-primary mb-4">Our Presence</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { flag: '🇳🇬', name: 'Nigeria', note: 'HQ' },
                  { flag: '🇬🇧', name: 'United Kingdom', note: '' },
                  { flag: '🇬🇭', name: 'Ghana', note: '' },
                  { flag: '🇰🇪', name: 'Kenya', note: '' },
                  { flag: '🇿🇦', name: 'South Africa', note: '' },
                  { flag: '🇺🇬', name: 'Uganda', note: '' },
                ].map(({ flag, name, note }) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="text-xl">{flag}</span>
                    <span className="text-sm text-gray-600">{name}</span>
                    {note && <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-bold">{note}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-outline">Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-primary mb-2">Send a Message</h2>
                <p className="text-gray-500 text-sm mb-6">Fill in the form below and we'll respond within 24 hours.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input {...register('name', { required: 'Name required' })} className="input" placeholder="Your name" />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label">Email *</label>
                      <input {...register('email', { required: 'Email required' })} type="email" className="input" placeholder="your@email.com" />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Phone</label>
                      <input {...register('phone')} className="input" placeholder="+234..." />
                    </div>
                    <div>
                      <label className="label">Subject *</label>
                      <input {...register('subject', { required: 'Subject required' })} className="input" placeholder="How can we help?" />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="label">Message *</label>
                    <textarea {...register('message', { required: 'Message required' })} className="input resize-none h-36" placeholder="Tell us more about how we can help..." />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
