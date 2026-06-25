import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ShieldCheck, FlaskConical, Users, Cpu, ArrowRight, CheckCircle } from 'lucide-react';

const PILLARS = [
  {
    num: '01',
    icon: BookOpen,
    title: 'Learning & Development',
    tagline: 'Building competency frameworks that drive performance.',
    description: 'We partner with organisations to design, plan and deliver comprehensive learning and development strategies. From training needs analysis to graduate programmes, we ensure your workforce has the competencies needed to excel.',
    topics: ['Training Needs Analysis', 'Annual Training Plans', 'Competency Frameworks', 'Leadership Development', 'Graduate Programmes', 'Training Delivery & Evaluation', 'Learning Records Management'],
    who: 'HR professionals, Learning & Development managers, corporate teams, senior leaders.',
    color: 'bg-primary',
  },
  {
    num: '02',
    icon: GraduationCap,
    title: 'Professional Training Academy',
    tagline: 'Industry-led training for agri-food professionals.',
    description: 'Our Professional Training Academy delivers accredited and industry-recognised training programmes across food safety, engineering, quality systems, leadership and agribusiness. Every programme is designed by industry experts for real-world application.',
    topics: ['Food Safety & Compliance', 'Engineering & Manufacturing', 'Laboratory & Quality Systems', 'Leadership & Management', 'Hospitality Excellence', 'Agriculture & Agribusiness', 'Professional Certification'],
    who: 'Food manufacturers, hospitality professionals, agribusiness operators, quality managers.',
    color: 'bg-accent',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'Consultancy & Compliance Services',
    tagline: 'Expert guidance to achieve and maintain compliance.',
    description: 'Our consultancy team supports businesses in developing, implementing and maintaining food safety management systems. From HACCP to international certification standards, we help you pass audits, achieve certifications, and build a culture of compliance.',
    topics: ['HACCP Development & Review', 'ISO 22000, ISO 9001, BRCGS', 'SALSA & FSSC 22000', 'Documentation Development', 'Internal Audits & Gap Assessments', 'Supplier & Compliance Audits', 'Certification Readiness'],
    who: 'Food manufacturers, processors, exporters, compliance officers, QA teams.',
    color: 'bg-primary',
  },
  {
    num: '04',
    icon: FlaskConical,
    title: 'Research & Innovation',
    tagline: 'Driving innovation through evidence-based research.',
    description: "AFIA's research and innovation team provides technical support for product development, shelf-life studies, process optimisation and sustainable agriculture initiatives. We bridge the gap between science, industry and market demand.",
    topics: ['Research Support', 'Product Development', 'Shelf-Life Studies', 'Process Optimisation', 'Sustainable & Regenerative Agriculture', 'Food Safety Innovation'],
    who: 'R&D teams, food scientists, agribusinesses, product developers, innovators.',
    color: 'bg-accent',
  },
  {
    num: '05',
    icon: Users,
    title: 'Workforce Development Solutions',
    tagline: 'Building talent pipelines for sustainable organisations.',
    description: 'We design and deliver holistic workforce development solutions — from entry-level apprenticeships to executive leadership pipelines. Our tailored programmes help organisations attract, develop and retain top talent across the agri-food sector.',
    topics: ['Competency Frameworks', 'Graduate Development', 'Apprenticeship Programmes', 'Leadership Pipeline', 'Coaching & Mentoring', 'Succession Planning'],
    who: 'HR directors, talent managers, corporate organisations, government agencies, NGOs.',
    color: 'bg-primary',
  },
  {
    num: '06',
    icon: Cpu,
    title: 'Digital Learning & Certification Platform',
    tagline: 'Learning anywhere, anytime — at your pace.',
    description: 'Our digital learning platform offers flexible, accessible, and affordable training for individuals and organisations. From self-paced online courses to live virtual training and a full corporate learning management system, we bring world-class learning to your screen.',
    topics: ['Online Courses (Self-Paced)', 'Live Virtual Training', 'Learning Management System', 'Digital Certificates', 'Corporate Learning Portal', 'Progress Tracking & Reports'],
    who: 'Individuals, remote learners, corporate teams, organisations needing scalable training.',
    color: 'bg-accent',
  },
];

export default function Faculties() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-primary-dark to-primary py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">Our Business Pillars & Services</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">6 Pillars of Excellence</h1>
          <p className="text-primary-100 text-xl leading-relaxed">
            Integrated solutions covering every dimension of professional development, compliance, innovation and workforce excellence.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
          {PILLARS.map(({ num, icon: Icon, title, tagline, description, topics, who, color }, i) => (
            <div
              key={title}
              className={`grid lg:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? '' : ''}`}
            >
              <div className={`${color} rounded-2xl p-8 text-white ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-white/40 text-5xl font-black leading-none">{num}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-white/70 italic mb-6 text-sm">{tagline}</p>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map((t) => (
                    <div key={t} className="flex items-start gap-2 text-sm text-white/90">
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full flex-shrink-0 mt-1.5" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <p className="text-gray-700 leading-relaxed mb-5 text-lg">{description}</p>
                <div className="bg-white rounded-xl p-5 border border-gray-100 mb-5">
                  <p className="text-sm font-semibold text-primary mb-1">Who this service is for:</p>
                  <p className="text-gray-600 text-sm">{who}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    to="/courses"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    View Programmes <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
                    Enquire Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-primary-100 mb-8">
            Our team will help you identify the right solution for your organisation's goals and challenges.
          </p>
          <Link to="/contact" className="bg-accent text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-accent-light transition-colors">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
