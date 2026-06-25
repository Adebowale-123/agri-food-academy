import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="text-2xl font-extrabold text-white leading-none">Agri-Food</div>
              <div className="text-accent font-semibold text-sm tracking-widest uppercase mt-0.5">Innovation Academy</div>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed mb-4">
              Professional learning, training, consultancy, research and workforce development across the agri-food, manufacturing, hospitality and agriculture sectors.
            </p>
            <p className="text-accent font-semibold italic text-sm">Building Competence. Driving Compliance. Inspiring Innovation.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ['/', 'Home'], ['/about', 'About AFIA'], ['/faculties', 'Our Services'],
                ['/courses', 'Programmes'], ['/events', 'Events'], ['/blog', 'Blog'],
                ['/resources', 'Resources'], ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-primary-200 hover:text-accent text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Pillars */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Our Services</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              {[
                'Learning & Development',
                'Professional Training Academy',
                'Consultancy & Compliance',
                'Research & Innovation',
                'Workforce Development',
                'Digital Learning Platform',
              ].map((f) => (
                <li key={f}>
                  <Link to="/faculties" className="hover:text-accent transition-colors">{f}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>No. 12 Innovation Drive, Agri-Food Hub, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+2348101234567" className="hover:text-accent">+234 810 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+442081331985" className="hover:text-accent">+44 20 8133 1985</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:info@afiaacademy.com" className="hover:text-accent">info@afiaacademy.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="https://www.afiaacademy.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">www.afiaacademy.com</a>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-primary-200 font-semibold uppercase tracking-widest mb-2">Our Presence</p>
              <div className="flex flex-wrap gap-1.5">
                {['🇳🇬 Nigeria (HQ)', '🇬🇭 Ghana', '🇰🇪 Kenya', '🇿🇦 South Africa', '🇺🇬 Uganda', '🇬🇧 UK'].map((c) => (
                  <span key={c} className="bg-white/10 text-xs text-primary-200 px-2 py-1 rounded">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-primary-200">
          <p>&copy; {new Date().getFullYear()} Agri-Food Innovation Academy (AFIA). All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-accent">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
