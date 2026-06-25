import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Globe, BookOpen, Building2, FlaskConical, Cpu, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import CourseCard from '../components/courses/CourseCard';
import EventCard from '../components/events/EventCard';
import { Course, Event } from '../types';

const PILLARS = [
  {
    num: '1',
    icon: BookOpen,
    title: 'Learning & Development',
    items: ['Training Needs Analysis', 'Annual Training Plans', 'Competency Frameworks', 'Leadership Development', 'Graduate Programmes', 'Training Delivery & Evaluation'],
    color: 'bg-primary',
  },
  {
    num: '2',
    icon: GraduationCap,
    title: 'Professional Training Academy',
    items: ['Food Safety & Compliance', 'Engineering & Manufacturing', 'Laboratory & Quality Systems', 'Leadership & Management', 'Agriculture & Agribusiness', 'Professional Certification'],
    color: 'bg-accent',
  },
  {
    num: '3',
    icon: ShieldCheck,
    title: 'Consultancy & Compliance Services',
    items: ['HACCP Development & Review', 'ISO 22000, ISO 9001, BRCGS', 'SALSA, FSSC 22000', 'Internal Audits & Gap Assessments', 'Supplier & Compliance Audits', 'Certification Readiness'],
    color: 'bg-primary',
  },
  {
    num: '4',
    icon: FlaskConical,
    title: 'Research & Innovation',
    items: ['Research Support', 'Product Development', 'Shelf-Life Studies', 'Process Optimisation', 'Sustainable Agriculture', 'Food Safety Innovation'],
    color: 'bg-accent',
  },
  {
    num: '5',
    icon: Users,
    title: 'Workforce Development Solutions',
    items: ['Competency Frameworks', 'Graduate Development', 'Apprenticeship Programmes', 'Leadership Pipeline', 'Coaching & Mentoring', 'Succession Planning'],
    color: 'bg-primary',
  },
  {
    num: '6',
    icon: Cpu,
    title: 'Digital Learning & Certification Platform',
    items: ['Online Courses (Self-Paced)', 'Live Virtual Training', 'Learning Management System', 'Digital Certificates', 'Corporate Learning Portal', 'Progress Tracking & Reports'],
    color: 'bg-accent',
  },
];

const STATS = [
  { value: '10,000+', label: 'Learners Trained Annually' },
  { value: '100+', label: 'Corporate Clients' },
  { value: '50+', label: 'Certification Programmes' },
  { value: '6', label: 'Countries — Africa & UK' },
];

const WHO_WE_SERVE = [
  { icon: '🏭', label: 'Food Manufacturing Companies' },
  { icon: '🍽️', label: 'Hotels, Restaurants & Catering' },
  { icon: '🌾', label: 'Agriculture & Agribusiness' },
  { icon: '🏛️', label: 'Government Agencies & Parastatals' },
  { icon: '🌍', label: 'NGOs & Development Organisations' },
  { icon: '🎓', label: 'Educational Institutions' },
  { icon: '🏪', label: 'Retail & Supply Chain Companies' },
  { icon: '🇬🇧', label: 'UK & International Markets' },
];

const WHY_AFIA = [
  'Industry-experienced professionals',
  'Practical, industry-focused training',
  'Integrated solutions (Training + Consultancy + Innovation)',
  'Customised learning for every organisation',
  'Strong presence in Nigeria, Africa & the UK',
  'Measurable impact and ROI',
];

const CHALLENGES = [
  'Skills and competency gaps',
  'Poor compliance and audit failures',
  'Inadequate training and development',
  'High staff turnover',
  'Poor food safety culture',
  'Limited access to quality training',
  'Low productivity and operational inefficiencies',
];

export default function Home() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ['featured-courses'],
    queryFn: () => api.get('/courses?featured=true').then((r) => r.data),
  });

  const { data: events } = useQuery<Event[]>({
    queryKey: ['featured-events'],
    queryFn: () => api.get('/events?featured=true').then((r) => r.data),
  });

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[620px] flex items-center overflow-hidden pt-20"
        style={{ background: 'linear-gradient(135deg, #0D1B38 0%, #1E3A6B 55%, #2C5499 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🌍 Nigeria · Ghana · Kenya · South Africa · Uganda · United Kingdom
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight mb-4">
              Building Competence.<br />
              <span className="text-accent">Driving Compliance.</span><br />
              Inspiring Innovation.
            </h1>

            <p className="text-primary-100 text-xl font-semibold mb-3">
              Empowering People. Strengthening Systems. Transforming Industries.
            </p>
            <p className="text-primary-200 text-base leading-relaxed mb-8 max-w-xl">
              AFIA is a professional learning, training, consultancy, research and workforce development organisation committed to building competent professionals and compliant businesses across the agri-food, manufacturing, hospitality and agriculture sectors.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/courses" className="bg-accent text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-accent-light transition-colors flex items-center gap-2">
                Explore Programmes <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors">
                Partner with Us
              </Link>
            </div>

            {/* Inline stat strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="border-l-2 border-accent pl-3">
                  <div className="text-2xl font-extrabold text-accent">{s.value}</div>
                  <div className="text-primary-300 text-xs leading-snug mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image mosaic */}
          <div className="hidden lg:flex gap-3 h-[520px]">
            {/* Tall left image */}
            <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=400&h=560&fit=crop&auto=format"
                alt="Food safety professional"
                className="w-full h-full object-cover"
              />
              {/* Badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur rounded-xl px-4 py-3 text-white">
                <div className="text-accent font-bold text-sm">Food Safety & Compliance</div>
                <div className="text-white/70 text-xs mt-0.5">HACCP · ISO 22000 · BRCGS</div>
              </div>
            </div>
            {/* Two stacked right images */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=260&fit=crop&auto=format"
                  alt="Professional training session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-accent/90 backdrop-blur rounded-lg px-3 py-2 text-white">
                  <div className="font-bold text-xs">Professional Training</div>
                  <div className="text-white/80 text-xs">Industry-led programmes</div>
                </div>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=260&fit=crop&auto=format"
                  alt="Agriculture and agribusiness"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-primary/90 backdrop-blur rounded-lg px-3 py-2 text-white">
                  <div className="font-bold text-xs">Agriculture & Agribusiness</div>
                  <div className="text-white/80 text-xs">Sustainable farming solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom green accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary to-accent opacity-60" />
      </section>

      {/* ── TAGLINE STRIP ── */}
      <section className="bg-primary py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-center">
          {['Learning & Development', 'Professional Training', 'Consultancy & Compliance', 'Research & Innovation', 'Workforce Development', 'Digital Learning'].map((w, i) => (
            <span key={w} className="text-white/80 font-semibold text-sm uppercase tracking-widest">
              {w}{i < 5 && <span className="text-accent mx-3">•</span>}
            </span>
          ))}
        </div>
      </section>

      {/* ── ABOUT AFIA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">About AFIA</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-5">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Agri-Food Innovation Academy (AFIA) is a professional learning and development, training, consultancy, research and workforce development organisation committed to building competent professionals, compliant businesses and innovative solutions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We serve the agri-food, manufacturing, hospitality and agriculture sectors across Africa and beyond — from our headquarters in Nigeria to our presence in Ghana, Kenya, South Africa, Uganda and the United Kingdom.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Professional L&D Organisation', 'Pan-African Presence', 'Nigeria HQ · UK Office', 'Industry-Led Curriculum', 'Compliance & Certification', 'Research & Innovation Hub'].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary rounded-2xl p-6 text-white text-center">
              <div className="text-4xl font-extrabold text-accent mb-1">10K+</div>
              <div className="text-sm text-primary-200">Learners Trained Annually</div>
            </div>
            <div className="bg-accent rounded-2xl p-6 text-white text-center">
              <div className="text-4xl font-extrabold text-white mb-1">100+</div>
              <div className="text-sm text-white/80">Corporate Clients</div>
            </div>
            <div className="bg-accent rounded-2xl p-6 text-white text-center">
              <div className="text-4xl font-extrabold text-white mb-1">50+</div>
              <div className="text-sm text-white/80">Certification Programmes</div>
            </div>
            <div className="bg-primary rounded-2xl p-6 text-white text-center">
              <div className="text-4xl font-extrabold text-accent mb-1">6</div>
              <div className="text-sm text-primary-200">Countries Across Africa & UK</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals and organisations through industry-relevant education, workforce development, technical consultancy, compliance support and innovation solutions that improve competence, productivity and business performance.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become Africa's most trusted and impactful institution for professional learning, compliance excellence and innovation in the agri-food ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* ── BUSINESS PILLARS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Business Pillars & Services</div>
            <h2 className="section-title">6 Pillars of Excellence</h2>
            <p className="section-subtitle">Integrated solutions covering every dimension of professional development and compliance</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map(({ num, icon: Icon, title, items, color }) => (
              <div key={title} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className={`${color} p-5 flex items-center gap-4`}>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white/70 text-xs font-bold uppercase tracking-widest">Pillar {num}</div>
                    <h3 className="text-white font-bold text-sm leading-snug">{title}</h3>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      {courses && courses.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Featured Programmes</div>
                <h2 className="section-title">Start Learning Today</h2>
                <p className="section-subtitle">Practical, industry-led programmes designed for professionals across Africa and the UK</p>
              </div>
              <Link to="/courses" className="btn-outline hidden sm:inline-flex items-center gap-2">
                All Programmes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE AFIA ── */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">Why Choose AFIA?</div>
            <h2 className="text-3xl font-bold text-white mb-8">The AFIA Difference</h2>
            <div className="space-y-4">
              {WHY_AFIA.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-primary-100">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-5">The Challenges We Solve</h3>
            <div className="space-y-3">
              {CHALLENGES.map((c) => (
                <div key={c} className="flex items-start gap-3 text-primary-200 text-sm">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✗</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Target Clients</div>
            <h2 className="section-title">Who We Serve</h2>
            <p className="section-subtitle">Designed for every professional and organisation in the agri-food ecosystem</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {WHO_WE_SERVE.map(({ icon, label }) => (
              <div key={label} className="text-center p-5 rounded-2xl border border-gray-100 hover:border-primary hover:bg-primary-50 transition-all">
                <div className="text-4xl mb-3">{icon}</div>
                <p className="text-sm font-medium text-gray-700 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      {events && events.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Upcoming Events</div>
                <h2 className="section-title">Events & Webinars</h2>
                <p className="section-subtitle">Stay connected through workshops, webinars and summits across Africa and the UK</p>
              </div>
              <Link to="/events" className="btn-outline hidden sm:inline-flex items-center gap-2">
                All Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {events.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OUR PRESENCE ── */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-3">Our Presence</h2>
          <p className="text-gray-500 mb-8">Building impact across Africa and beyond</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { flag: '🇳🇬', name: 'Nigeria', note: 'HQ' },
              { flag: '🇬🇭', name: 'Ghana', note: '' },
              { flag: '🇰🇪', name: 'Kenya', note: '' },
              { flag: '🇿🇦', name: 'South Africa', note: '' },
              { flag: '🇺🇬', name: 'Uganda', note: '' },
              { flag: '🇬🇧', name: 'United Kingdom', note: '' },
            ].map(({ flag, name, note }) => (
              <div key={name} className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100">
                <span className="text-2xl">{flag}</span>
                <span className="font-semibold text-primary text-sm">{name}</span>
                {note && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-bold">{note}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Partner with AFIA
          </h2>
          <p className="text-primary-100 text-xl mb-3 font-semibold">
            Invest in People. Build Competence. Drive Compliance. Inspire Innovation.
          </p>
          <p className="text-primary-200 mb-8">
            Together, let's transform industries and build sustainable futures.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-accent text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-accent-light transition-colors">
              Start Learning Today
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
