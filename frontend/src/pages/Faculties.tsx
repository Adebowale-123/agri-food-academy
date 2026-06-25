import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck, Monitor, Globe, FlaskConical, Users } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'Process & Quality Management Agent',
    subtitle: 'Nigerian Agri-Food Companies',
    badge: 'bg-green-600',
    border: 'border-green-500',
    desc: 'We act as your outsourced Process & Quality Management Agent to build, implement and manage robust quality and compliance systems. This service is designed for Nigerian agri-food companies that need expert quality management support without the cost of full-time staff.',
    items: [
      'Process Mapping & Optimisation',
      'Quality Management Systems (QMS)',
      'SOP Development & Documentation',
      'HACCP Plan Development & Implementation',
      'Supplier Approval & Management',
      'Internal Audits & Continuous Improvement',
      'Regulatory Liaison & Compliance Support',
    ],
    focus: 'Efficiency. Compliance. Excellence.',
    who: 'Nigerian food manufacturers, processors, agri-food SMEs seeking quality management support.',
  },
  {
    num: '02',
    icon: Monitor,
    title: 'Digital Compliance Platform',
    subtitle: 'App & Website',
    badge: 'bg-blue-600',
    border: 'border-blue-500',
    desc: 'All your checklists, parameters, records and compliance documents – all in one place, easily accessible. Our digital compliance platform helps food businesses move from paper-based systems to smart, audit-ready digital records.',
    items: [
      'Digital Checklists & Inspections',
      'Parameter Monitoring',
      'Document Management',
      'Analytics & Reports',
      'Alerts & Notifications',
      'Real-time Data Access',
      'Audit-Ready Records',
    ],
    keyBenefits: ['Real-time data', 'Centralised records', 'Easy access', 'Audit-ready', 'Regulatory compliance', 'Paperless system'],
    focus: 'Real-time. Centralised. Paperless.',
    who: 'Food businesses of all sizes wanting to digitise their compliance and quality management.',
  },
  {
    num: '03',
    icon: Globe,
    title: 'Compliance Consulting',
    subtitle: 'UK Agri-Food & Food Businesses',
    badge: 'bg-accent',
    border: 'border-accent',
    desc: 'We provide end-to-end compliance consulting for food businesses in the UK. From achieving your first food safety certification to maintaining multi-site compliance programmes, our UK-based experts guide you through every step.',
    items: [
      'Food Safety Management Systems (BRCGS, SALSA, ISO 22000)',
      'UK Food Law Compliance',
      'Allergen Management (Natasha\'s Law)',
      'HACCP Implementation & Review',
      'Label Compliance & Nutrition Labelling',
      'Regulatory Audits & Mock Inspections',
      'Training for Staff & Management',
      'Ongoing Compliance Support',
    ],
    focus: 'Compliance. Confidence. Growth.',
    who: 'UK food manufacturers, retailers, importers, restaurants and food service businesses.',
  },
  {
    num: '04',
    icon: FlaskConical,
    title: 'Research & Innovation Services',
    subtitle: 'Knowledge-Driven Solutions',
    badge: 'bg-amber-600',
    border: 'border-amber-500',
    desc: 'We generate knowledge and practical solutions that drive innovation and industry advancement. Our research team works with businesses and institutions to address technical challenges and unlock new opportunities.',
    items: [
      'Applied Research & Development',
      'Product & Process Innovation',
      'Shelf-Life & Stability Studies',
      'Microbiological & Analytical Testing',
      'Sensory & Consumer Research',
      'Packaging & Materials Evaluation',
      'Technical Reports & Publications',
      'Industry Collaboration & Grants',
    ],
    focus: 'Innovation. Evidence. Impact.',
    who: 'Food manufacturers, agribusinesses, research institutions and development organisations.',
  },
  {
    num: '05',
    icon: Users,
    title: 'Learning & Development Solutions',
    subtitle: 'Including Workforce Development',
    badge: 'bg-purple-600',
    border: 'border-purple-500',
    desc: 'We develop people and build high-performing workforces for sustainable growth. Our L&D solutions are fully tailored to your organisation\'s needs, industry context and strategic goals.',
    items: [
      'Training Needs Analysis',
      'Learning Strategy Development',
      'Competency Frameworks',
      'Custom Learning Programmes',
      'Digital Learning (Self-Paced, Live Virtual & Blended)',
      'Workforce Upskilling & Reskilling',
      'Performance Improvement',
      'Leadership & Talent Development',
      'Learning Impact Measurement',
    ],
    focus: 'People. Performance. Progress.',
    who: 'HR & L&D teams, corporate organisations, government agencies, NGOs, and food industry leaders.',
  },
];

export default function Faculties() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">Our Core Services</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">5 Ways We Serve You</h1>
          <p className="text-primary-100 text-xl leading-relaxed">
            Integrated services covering training, compliance consulting, digital technology, research and workforce development — all under one roof.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {SERVICES.map(({ num, icon: Icon, title, subtitle, badge, border, desc, items, focus, who, keyBenefits }, i) => (
            <div key={title} className={`bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border-t-4 ${border}`}>
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Left panel */}
                <div className={`lg:col-span-2 p-8 flex flex-col ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`${badge} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Service {num}</div>
                      <h2 className="text-xl font-bold text-primary leading-snug">{title}</h2>
                      <p className="text-sm text-gray-400 italic">{subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
                  {keyBenefits && (
                    <div className="mb-5">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Key Benefits</p>
                      <div className="flex flex-wrap gap-2">
                        {keyBenefits.map((b) => (
                          <span key={b} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">{b}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="bg-primary-50 rounded-xl p-4 mb-5">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Who This Is For</p>
                    <p className="text-sm text-gray-600">{who}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-sm font-bold text-accent italic">FOCUS: {focus}</p>
                  </div>
                </div>

                {/* Right panel: service items */}
                <div className={`lg:col-span-3 bg-gray-50 p-8 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">What's Included</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {items.map((item) => (
                      <div key={item} className="flex items-start gap-2 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3 flex-wrap">
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
                      Enquire About This Service <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/courses" className="btn-outline inline-flex items-center gap-2 text-sm">
                      Related Courses
                    </Link>
                  </div>
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
          <p className="text-primary-100 mb-8">Our team will help you find the right solution for your organisation's goals.</p>
          <Link to="/contact" className="bg-accent text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-accent-light transition-colors">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
