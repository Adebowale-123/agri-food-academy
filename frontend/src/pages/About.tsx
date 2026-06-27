import { CheckCircle, Target, Eye, Heart, Users, Globe, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CORE_VALUES = [
  { icon: '🏆', label: 'Excellence', desc: 'We deliver the highest standards in everything we do.' },
  { icon: '🤝', label: 'Integrity', desc: 'We act with honesty, transparency and ethical responsibility.' },
  { icon: '💡', label: 'Innovation', desc: 'We embrace creative thinking and evidence-based solutions.' },
  { icon: '🌐', label: 'Collaboration', desc: 'We build partnerships that amplify our collective impact.' },
  { icon: '📈', label: 'Impact', desc: 'We measure success by the real change we create in organisations.' },
  { icon: '📚', label: 'Lifelong Learning', desc: 'We believe continuous learning is the foundation of growth.' },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">About AFIA</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Who We Are</h1>
          <p className="text-primary-100 text-xl leading-relaxed">
            Agri-Food Innovation Academy (AFIA) — a professional learning, training, consultancy, research and workforce development organisation committed to building competent professionals and compliant businesses.
          </p>
        </div>
      </section>

      {/* About Description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Agri-Food Innovation Academy (AFIA)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              AFIA is a professional learning and development, training, consultancy, research and workforce development organisation committed to building competent professionals, compliant businesses and innovative solutions within the agri-food, manufacturing, hospitality and agriculture sectors across Africa and beyond.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We serve individuals and organisations — from food manufacturers and agribusinesses to government agencies and NGOs — helping them close skills gaps, pass audits, achieve certifications, and develop their workforce for sustainable growth.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With our headquarters in Abuja, Nigeria, and a presence across Ghana, Kenya, South Africa, Uganda and the United Kingdom, AFIA is building Africa's most trusted institution for professional learning and compliance excellence.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Professional L&D Organisation',
                'Pan-African Presence',
                'Nigeria HQ · UK Office',
                'Industry-Led Curriculum',
                'Compliance & Certification',
                'Research & Innovation Hub',
                'Digital Learning Platform',
                'Workforce Development',
              ].map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[420px]">
            <img
              src="/images/afia-products.jpg.jpeg"
              alt="AFIA — Innovating Food. Improving Lives."
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-2 p-4">
              {[
                { value: '10K+', label: 'Learners Trained Annually' },
                { value: '100+', label: 'Corporate Clients' },
                { value: '50+', label: 'Certification Programmes' },
                { value: '6', label: 'Countries Across Africa & UK' },
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

      {/* Mission & Vision */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals and organisations through industry-relevant education, workforce development, technical consultancy, compliance support and innovation solutions that improve competence, productivity and business performance.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become Africa's most trusted and impactful institution for professional learning, compliance excellence and innovation in the agri-food ecosystem.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-primary mb-2">Our Core Values</h2>
            <p className="text-gray-500">The principles that guide every decision we make</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_VALUES.map(({ icon, label, desc }) => (
              <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{icon}</div>
                <h4 className="font-bold text-primary mb-2">{label}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Presence */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-primary mb-2">Our Presence</h2>
            <p className="text-gray-500">Building impact across Africa and beyond</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { flag: '🇳🇬', name: 'Nigeria', note: 'HQ' },
              { flag: '🇬🇭', name: 'Ghana', note: '' },
              { flag: '🇰🇪', name: 'Kenya', note: '' },
              { flag: '🇿🇦', name: 'South Africa', note: '' },
              { flag: '🇺🇬', name: 'Uganda', note: '' },
              { flag: '🇬🇧', name: 'United Kingdom', note: '' },
            ].map(({ flag, name, note }) => (
              <div key={name} className="flex items-center gap-2 bg-primary-50 px-5 py-3 rounded-full border border-primary-100">
                <span className="text-2xl">{flag}</span>
                <span className="font-semibold text-primary text-sm">{name}</span>
                {note && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full font-bold">{note}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with AFIA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Partner with AFIA</h2>
          <p className="text-primary-100 text-lg mb-3 font-semibold">
            Invest in People. Build Competence. Drive Compliance. Inspire Innovation.
          </p>
          <p className="text-primary-200 mb-8">
            Together, let's transform industries and build sustainable futures.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-200 mb-8">
            {['Training Delivery Partnerships', 'Research Collaborations', 'Workforce Development Programs', 'Corporate Learning Partnerships', 'Sponsorship & Grant Partnerships'].map((p) => (
              <span key={p} className="bg-white/10 px-3 py-1.5 rounded-full">{p}</span>
            ))}
          </div>
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
