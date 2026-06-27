import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Users, Globe, BookOpen, FlaskConical,
  Cpu, ShieldCheck, GraduationCap, Lightbulb, Briefcase, Heart,
  Award, MonitorPlay, Video, ClipboardCheck, FileText, BadgeCheck,
  TrendingUp, Leaf, Factory, Monitor,
} from 'lucide-react';
import api from '../services/api';
import CourseCard from '../components/courses/CourseCard';
import EventCard from '../components/events/EventCard';
import { Course, Event } from '../types';

const STATS = [
  { value: '10,000+', label: 'Learners Trained Annually' },
  { value: '100+', label: 'Corporate Clients' },
  { value: '50+', label: 'Certification Programmes' },
  { value: '6', label: 'Countries — Africa & UK' },
];

const COURSE_CATEGORIES = [
  { num: '1', icon: ShieldCheck, title: 'Food Safety & Compliance', color: 'bg-green-700', light: 'bg-green-50 border-green-200', text: 'text-green-700', count: 7, desc: 'HACCP, GMP, allergen management, food safety auditing' },
  { num: '2', icon: Factory, title: 'Food Manufacturing Engineering', color: 'bg-blue-700', light: 'bg-blue-50 border-blue-200', text: 'text-blue-700', count: 7, desc: 'Unit operations, hygienic design, sanitation engineering' },
  { num: '3', icon: FlaskConical, title: 'Food Science & Laboratory Systems', color: 'bg-amber-700', light: 'bg-amber-50 border-amber-200', text: 'text-amber-700', count: 5, desc: 'Microbiology, shelf-life testing, lab quality systems' },
  { num: '4', icon: Lightbulb, title: 'Product Development & Innovation', color: 'bg-orange-600', light: 'bg-orange-50 border-orange-200', text: 'text-orange-600', count: 5, desc: 'NPD, formulation, sensory evaluation, scale-up' },
  { num: '5', icon: Briefcase, title: 'Food Entrepreneurship & Industry', color: 'bg-purple-700', light: 'bg-purple-50 border-purple-200', text: 'text-purple-700', count: 5, desc: 'Business setup, regulatory compliance, labelling, costing' },
  { num: '6', icon: Heart, title: 'Health, Safety & Environment (HSE)', color: 'bg-red-700', light: 'bg-red-50 border-red-200', text: 'text-red-700', count: 6, desc: 'Risk assessment, fire safety, occupational health' },
  { num: '7', icon: Award, title: 'Quality Management & Systems', color: 'bg-primary', light: 'bg-primary-50 border-primary-200', text: 'text-primary', count: 10, desc: 'ISO 9001, SPC, lean manufacturing, CAPA systems' },
];

const CORE_SERVICES = [
  {
    num: '1',
    icon: ShieldCheck,
    title: 'Process & Quality Management Agent',
    subtitle: 'Nigerian Agri-Food Companies',
    desc: 'We act as your outsourced Process & Quality Management Agent to build, implement and manage robust quality and compliance systems.',
    items: ['Process Mapping & Optimisation', 'Quality Management Systems (QMS)', 'SOP Development & Documentation', 'HACCP Plan Development & Implementation', 'Internal Audits & Continuous Improvement', 'Regulatory Liaison & Compliance Support'],
    focus: 'Efficiency. Compliance. Excellence.',
    color: 'border-green-500',
    badge: 'bg-green-600',
  },
  {
    num: '2',
    icon: Monitor,
    title: 'Digital Compliance Platform',
    subtitle: 'App & Website',
    desc: 'All your checklists, parameters, records and compliance documents – all in one place, easily accessible.',
    items: ['Digital Checklists & Inspections', 'Parameter Monitoring', 'Document Management', 'Analytics & Reports', 'Alerts & Notifications', 'Audit-Ready Records'],
    focus: 'Real-time · Centralised · Paperless.',
    color: 'border-blue-500',
    badge: 'bg-blue-600',
  },
  {
    num: '3',
    icon: Globe,
    title: 'Compliance Consulting',
    subtitle: 'UK Agri-Food & Food Businesses',
    desc: 'We provide end-to-end compliance consulting for food businesses in the UK.',
    items: ['Food Safety Systems (BRCGS, SALSA, ISO 22000)', 'UK Food Law Compliance', 'Allergen Management (Natasha\'s Law)', 'HACCP Implementation & Review', 'Label Compliance & Nutrition Labelling', 'Regulatory Audits & Mock Inspections'],
    focus: 'Compliance. Confidence. Growth.',
    color: 'border-accent',
    badge: 'bg-accent',
  },
  {
    num: '4',
    icon: FlaskConical,
    title: 'Research & Innovation Services',
    subtitle: 'Knowledge-Driven Solutions',
    desc: 'We generate knowledge and practical solutions that drive innovation and industry advancement.',
    items: ['Applied Research & Development', 'Product & Process Innovation', 'Shelf-Life & Stability Studies', 'Microbiological & Analytical Testing', 'Sensory & Consumer Research', 'Technical Reports & Publications'],
    focus: 'Innovation. Evidence. Impact.',
    color: 'border-amber-500',
    badge: 'bg-amber-600',
  },
  {
    num: '5',
    icon: Users,
    title: 'Learning & Development Solutions',
    subtitle: 'Including Workforce Development',
    desc: 'We develop people and build high-performing workforces for sustainable growth.',
    items: ['Training Needs Analysis', 'Learning Strategy Development', 'Competency Frameworks', 'Custom Learning Programmes', 'Digital Learning (Self-Paced, Live & Blended)', 'Leadership & Talent Development'],
    focus: 'People. Performance. Progress.',
    color: 'border-purple-500',
    badge: 'bg-purple-600',
  },
];

const PLATFORM_FEATURES = [
  { icon: MonitorPlay, label: 'Interactive Lessons', desc: 'Engaging, structured learning modules' },
  { icon: Video, label: 'Live Virtual Sessions', desc: 'Real-time training with expert instructors' },
  { icon: ClipboardCheck, label: 'Assessments & Quizzes', desc: 'Test and reinforce your knowledge' },
  { icon: FileText, label: 'Practical Resources', desc: 'Templates, guides and toolkits' },
  { icon: BadgeCheck, label: 'Recognised Certificates', desc: 'Industry-accepted digital certificates' },
  { icon: Globe, label: 'Accessible Anywhere', desc: 'Learn on any device, at any time' },
];

const IMPACT = [
  { icon: '🥗', label: 'Safer Food', desc: 'Better trained professionals = safer food for consumers' },
  { icon: '💼', label: 'Stronger Businesses', desc: 'Compliant, competent businesses that perform' },
  { icon: '✅', label: 'Regulatory Compliance', desc: 'Organisations that meet and exceed standards' },
  { icon: '🌱', label: 'Sustainable Communities', desc: 'Building long-term resilience in agri-food sectors' },
  { icon: '💡', label: 'Innovation for the Future', desc: 'Driving new thinking and solutions across the industry' },
];

const WHO_WE_SERVE = [
  { icon: '🏭', label: 'Food Manufacturing Companies' },
  { icon: '🍽️', label: 'Hospitality (Hotels, Restaurants, Caterers)' },
  { icon: '🌾', label: 'Agriculture & Agri-businesses' },
  { icon: '🏛️', label: 'Government Agencies & Parastatals' },
  { icon: '🌍', label: 'NGOs & Development Organisations' },
  { icon: '🎓', label: 'Educational Institutions' },
  { icon: '🏪', label: 'Retail & Supply Chain Companies' },
  { icon: '🌐', label: 'International Markets' },
];

const WHY_AFIA = [
  'Industry-experienced professionals',
  'Practical, industry-focused solutions',
  'Integrated solutions (Training + Consultancy + Research)',
  'Customised learning for every organisation',
  'Measurable impact and ROI',
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
        className="relative min-h-[640px] flex items-center overflow-hidden pt-20"
        style={{ background: 'linear-gradient(135deg, #0D1B38 0%, #1E3A6B 55%, #2C5499 100%)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="border-l-2 border-accent pl-3">
                  <div className="text-2xl font-extrabold text-accent">{s.value}</div>
                  <div className="text-primary-300 text-xs leading-snug mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/tablet image mosaic */}
          <div className="flex lg:hidden gap-2 h-[340px] sm:h-[420px]">
            <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src="/images/hero-classroom.jpg.jpeg"
                alt="AFIA expert-led training session"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-primary/90 backdrop-blur rounded-xl px-3 py-2">
                <div className="text-accent font-bold text-xs">Expert-Led Training</div>
                <div className="text-white/70 text-xs mt-0.5">HACCP · GMP · Food Safety</div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="/images/inspector.jpg.jpeg"
                  alt="Food quality inspector"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-accent/90 backdrop-blur rounded-lg px-2 py-1.5">
                  <div className="font-bold text-white text-xs">Quality & Compliance</div>
                </div>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="/images/food-factory.jpg.jpeg"
                  alt="Food manufacturing facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-primary/90 backdrop-blur rounded-lg px-2 py-1.5">
                  <div className="font-bold text-white text-xs">Food Manufacturing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop image mosaic */}
          <div className="hidden lg:flex gap-3 h-[520px]">
            <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
              <img
                src="/images/hero-classroom.jpg.jpeg"
                alt="AFIA expert-led training session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur rounded-xl px-4 py-3">
                <div className="text-accent font-bold text-sm">Expert-Led Training</div>
                <div className="text-white/70 text-xs mt-0.5">HACCP · GMP · Food Safety</div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="/images/inspector.jpg.jpeg"
                  alt="Food quality inspector on the production floor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-accent/90 backdrop-blur rounded-lg px-3 py-2">
                  <div className="font-bold text-white text-xs">Quality & Compliance</div>
                  <div className="text-white/80 text-xs">ISO · BRCGS · Auditing</div>
                </div>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src="/images/food-factory.jpg.jpeg"
                  alt="Modern food manufacturing facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-primary/90 backdrop-blur rounded-lg px-3 py-2">
                  <div className="font-bold text-white text-xs">Food Manufacturing</div>
                  <div className="text-white/80 text-xs">Engineering · Hygienic Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary to-accent opacity-60" />
      </section>

      {/* ── 4 PILLARS STRIP ── */}
      <section className="bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
          {[
            { icon: '💡', label: 'INNOVATION' },
            { icon: '📚', label: 'KNOWLEDGE' },
            { icon: '🛡️', label: 'COMPLIANCE' },
            { icon: '📈', label: 'IMPACT' },
          ].map(({ icon, label }) => (
            <div key={label} className="py-5 text-center hover:bg-white/5 transition-colors">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-white font-bold text-xs tracking-[0.2em]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-accent text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Empowering people, strengthening systems, and transforming industries through learning, compliance, innovation, and workforce development.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border-l-4 border-accent shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">👁</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To be Africa's leading academy for learning, innovation, workforce development, and industry excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR COURSES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Our Courses</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">7 Professional Learning Tracks</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">All courses are delivered through our Digital Learning &amp; Certification Platform</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 mb-6">
            {COURSE_CATEGORIES.map(({ num, icon: Icon, title, color, light, text, count, desc }) => (
              <Link
                key={title}
                to={`/courses?faculty=${encodeURIComponent(title)}`}
                className={`border ${light} rounded-2xl overflow-hidden hover:shadow-lg transition-all group`}
              >
                <div className={`${color} p-4 flex items-center gap-3`}>
                  <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white/50 font-black text-2xl leading-none">{num}</span>
                </div>
                <div className="p-4">
                  <h3 className={`font-bold text-sm mb-1 ${text} group-hover:underline`}>{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{count} courses</span>
                    <ArrowRight className={`w-4 h-4 ${text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
              Browse All Programmes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DELIVERY PLATFORM STRIP ── */}
      <section className="bg-primary py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-center">
          {['💻 Learn Anytime, Anywhere', '🏆 Get Certified', '🚀 Apply. Perform. Excel.'].map((w) => (
            <span key={w} className="text-white font-bold text-sm uppercase tracking-widest">{w}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      {courses && courses.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
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

      {/* ── CORE SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Our Core Services</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">5 Ways We Serve You</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Integrated services covering training, compliance, technology, research and workforce development</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map(({ num, icon: Icon, title, subtitle, desc, items, focus, color, badge }) => (
              <div key={title} className={`border-t-4 ${color} bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6`}>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`${badge} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">{num}</div>
                    <h3 className="font-bold text-primary text-sm leading-snug">{title}</h3>
                    <div className="text-gray-400 text-xs italic">{subtitle}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs font-bold text-primary italic">FOCUS: {focus}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/faculties" className="btn-primary inline-flex items-center gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOD BUSINESS SERVICES ── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">For Food Businesses</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Empowering Restaurants, Eateries & Hotels</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We help food businesses build safe, efficient and profitable operations through training, consulting and practical solutions.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/afia-consulting.jpg.jpeg"
                alt="AFIA — Empowering Food Businesses with Safety, Quality & Excellence"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: '🛡️', title: 'Food Safety Management', desc: 'HACCP, Food Safety Plans, Risk Assessment & Control' },
                  { icon: '👩‍🍳', title: 'Staff Training', desc: 'Food Hygiene, HACCP, Allergen Awareness & more' },
                  { icon: '📋', title: 'Menu & Recipe Review', desc: 'Nutritional Analysis, Standard Recipes, Portion Control' },
                  { icon: '🔍', title: 'Audits & Inspections', desc: 'Internal Audits, Pre-Inspection Checks & Compliance' },
                  { icon: '🧹', title: 'Cleaning & Sanitation', desc: 'Cleaning Schedules, Sanitation Procedures & Monitoring' },
                  { icon: '📄', title: 'Policies & Documentation', desc: 'Food Safety Policies, SOPs & Record Keeping' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <div className="font-bold text-primary text-sm">{title}</div>
                      <div className="text-gray-500 text-xs mt-0.5 leading-snug">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-primary rounded-2xl p-5">
                <div className="text-accent font-extrabold text-sm uppercase tracking-widest mb-2">We Work With</div>
                <div className="flex gap-3 mb-4">
                  {['🍽️ Restaurants', '🥘 Eateries', '🏨 Hotels'].map((b) => (
                    <span key={b} className="bg-white/10 text-white text-sm font-semibold px-3 py-1.5 rounded-full">{b}</span>
                  ))}
                </div>
                <p className="text-primary-200 text-sm mb-4">Better Food. Better Business. Better Future.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-accent-light transition-colors">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIGITAL LEARNING PLATFORM ── */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Digital Learning & Certification Platform</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">All Trainings Delivered Through Our Platform</h2>
            <p className="text-primary-200 max-w-2xl mx-auto">A world-class digital learning experience — accessible anywhere, on any device</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORM_FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{label}</h3>
                <p className="text-primary-200 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/register" className="bg-accent text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-accent-light transition-colors inline-flex items-center gap-2">
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR IMPACT ── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Our Impact</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">The Change We Create</h2>
            <p className="text-gray-500">Every programme we deliver contributes to lasting industry transformation</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {IMPACT.map(({ icon, label, desc }) => (
              <div key={label} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-primary mb-2 text-sm">{label}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE AFIA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">Why Choose AFIA?</div>
            <h2 className="text-3xl font-bold text-primary mb-6">The AFIA Difference</h2>
            <p className="text-gray-500 mb-8">We don't just train — we transform. Our integrated approach combines professional training, consultancy and research to deliver measurable results for individuals and organisations.</p>
            <div className="space-y-4">
              {WHY_AFIA.map((point) => (
                <div key={point} className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[380px]">
            <img
              src="/images/machinery.jpg.jpeg"
              alt="Food manufacturing machinery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-2 p-4">
              {[
                { value: '10K+', label: 'Learners Trained' },
                { value: '100+', label: 'Corporate Clients' },
                { value: '50+', label: 'Certifications' },
                { value: '6', label: 'Countries' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-primary/80 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <div className="text-2xl font-extrabold text-accent">{value}</div>
                  <div className="text-xs text-primary-200 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Our Target Clients</div>
            <h2 className="text-3xl font-bold text-primary mb-2">Who We Serve</h2>
            <p className="text-gray-500">Designed for every professional and organisation in the agri-food ecosystem</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {WHO_WE_SERVE.map(({ icon, label }) => (
              <div key={label} className="text-center p-5 rounded-2xl bg-white border border-gray-100 hover:border-primary hover:bg-primary-50 hover:shadow-md transition-all">
                <div className="text-4xl mb-3">{icon}</div>
                <p className="text-sm font-semibold text-gray-700 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      {events && events.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">Upcoming Events</div>
                <h2 className="section-title">Events & Webinars</h2>
                <p className="section-subtitle">Stay connected through workshops, webinars and summits</p>
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

      {/* ── PRESENCE ── */}
      <section className="py-16 bg-primary-50 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Our Presence</h2>
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

      {/* ── PARTNER CTA ── */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Partner with AFIA</h2>
          <p className="text-primary-100 text-xl font-semibold mb-3">
            Let's build competence, strengthen systems and transform industries together.
          </p>
          <p className="text-primary-200 mb-8">
            Training · Consultancy · Research · Workforce Development · Digital Learning
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
