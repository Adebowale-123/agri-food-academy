import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ShieldCheck, Award, FlaskConical, Lightbulb, Briefcase, Heart, Factory } from 'lucide-react';
import api from '../services/api';
import CourseCard from '../components/courses/CourseCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Course } from '../types';

const CATEGORIES = [
  { label: 'All Programmes', value: 'All' },
  { label: 'Food Safety & Compliance', value: 'Food Safety & Compliance', icon: ShieldCheck, color: 'bg-green-600' },
  { label: 'Food Manufacturing Engineering', value: 'Food Manufacturing Engineering', icon: Factory, color: 'bg-blue-700' },
  { label: 'Food Science & Laboratory', value: 'Food Science & Laboratory Systems', icon: FlaskConical, color: 'bg-amber-600' },
  { label: 'Product Development', value: 'Product Development & Innovation', icon: Lightbulb, color: 'bg-orange-600' },
  { label: 'Food Entrepreneurship', value: 'Food Entrepreneurship & Industry', icon: Briefcase, color: 'bg-purple-700' },
  { label: 'Health, Safety & Environment', value: 'Health, Safety & Environment (HSE)', icon: Heart, color: 'bg-red-600' },
  { label: 'Quality Management', value: 'Quality Management & Systems', icon: Award, color: 'bg-primary' },
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const COURSE_LIST = [
  { cat: 'Food Safety & Compliance', courses: [
    'Introduction to HACCP for Food Businesses (Foundation Level)',
    'Good Manufacturing Practice (GMP) for Food Manufacturing Compliance',
    'Food Safety & Hygiene Level 2 for Food Handlers (UK Standard)',
    'HACCP Level 2: Practical Implementation for Food Operations',
    'HACCP Level 3: HACCP System Development & Management',
    'Food Allergen Management & Natasha\'s Law Compliance',
    'Internal Food Safety Auditing (HACCP & GMP Systems)',
  ]},
  { cat: 'Food Manufacturing Engineering', courses: [
    'Unit Operations in Food Processing: Principles & Industrial Applications',
    'Food Processing Equipment Design & Hygienic Engineering',
    'Food Factory Design & Hygienic Layout for Compliance',
    'Sanitation Engineering & Cleaning Systems (CIP) in Food Factories',
    'Airflow, Ventilation & Environmental Control in Food Production',
    'Temperature Control & Thermal Processing in Food Manufacturing',
    'Hygienic Design of Food Processing Facilities (Advanced)',
  ]},
  { cat: 'Food Science & Laboratory Systems', courses: [
    'Food Microbiology for Food Manufacturing & Safety Control',
    'Environmental Monitoring & Hygiene Verification in Food Factories',
    'Shelf-Life Testing & Product Stability for Food Products',
    'Microbiological Sampling & Testing for Food Safety Compliance',
    'Laboratory Quality Management Systems for Food Testing Labs',
  ]},
  { cat: 'Product Development & Innovation', courses: [
    'Food Product Development & Commercialisation (Concept to Market)',
    'Food Formulation & Ingredient Functionality',
    'Sensory Evaluation & Consumer Testing for Food Products',
    'Product Stability, Packaging & Shelf-Life Interaction',
    'Scaling Food Production: From Pilot Plant to Factory',
  ]},
  { cat: 'Food Entrepreneurship & Industry', courses: [
    'Food Processing for Entrepreneurs: From Idea to Production',
    'Small Food Factory Setup & Operational Management',
    'Food Product Registration & Regulatory Compliance (UK & Export)',
    'Food Manufacturing Business Planning & Costing',
    'Food Packaging & Labelling Compliance (UK & International Standards)',
  ]},
  { cat: 'Health, Safety & Environment (HSE)', courses: [
    'Introduction to Health, Safety & Environment (HSE) in Food Manufacturing',
    'Workplace Hazard Identification & Risk Assessment (Food Industry)',
    'Fire Safety & Emergency Response in Food Factories',
    'Occupational Health & Industrial Hygiene in Food Production',
    'Incident Investigation & Root Cause Analysis for Workplace Safety',
    'Safe Machinery Operation & Lockout/Tagout Procedures',
  ]},
  { cat: 'Quality Management & Systems', courses: [
    'Introduction to Quality Management Systems in Food Manufacturing',
    'ISO 9001: Quality Management Systems for Food Industry Compliance',
    'Statistical Process Control (SPC) for Food Manufacturing Efficiency',
    'Quality Control Techniques & In-Process Inspection in Food Production',
    'Root Cause Analysis & CAPA for Food Industry Compliance',
    'Internal Quality Auditing (ISO & Food Manufacturing Systems)',
    'Supplier Quality Management & Raw Material Assurance',
    'Quality Documentation, Traceability & Record Control Systems',
    'Lean Manufacturing & Continuous Improvement in Food Factories',
    'Non-Conformance Management & CAPA Systems for Food Compliance',
  ]},
];

export default function Courses() {
  const [faculty, setFaculty] = useState('All');
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => api.get('/courses').then((r) => r.data),
  });

  const filtered = (courses || []).filter((c) => {
    const matchFaculty = faculty === 'All' || c.faculty === faculty;
    const matchLevel = level === 'All' || c.level === level;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchFaculty && matchLevel && matchSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Programmes</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Professional Learning Tracks</h1>
          <p className="text-primary-100 text-lg">
            All courses are delivered through our Digital Learning &amp; Certification Platform — learn anytime, anywhere, at your pace.
          </p>
        </div>
      </section>

      {/* Category filter tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {CATEGORIES.map(({ label, value, icon: Icon, color }) => (
              <button
                key={value}
                onClick={() => setFaculty(value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  faculty === value
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10 text-sm py-2" />
            </div>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="input w-auto bg-white text-sm py-2">
              {LEVELS.map((l) => <option key={l} value={l}>{l === 'All' ? 'All Levels' : l}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Enrolled courses from DB */}
      {!isLoading && filtered.length > 0 && (
        <section className="py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-gray-500 text-sm mb-6">{filtered.length} programme{filtered.length !== 1 ? 's' : ''} available</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {isLoading && <div className="py-20 flex justify-center"><LoadingSpinner /></div>}

      {/* Full course catalogue (static) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-primary mb-2">Full Programme Catalogue</h2>
            <p className="text-gray-500">40+ programmes across 7 professional learning tracks</p>
          </div>
          <div className="space-y-8">
            {COURSE_LIST.filter((cl) => faculty === 'All' || cl.cat === faculty).map(({ cat, courses: courseList }) => {
              const catInfo = CATEGORIES.find((c) => c.value === cat);
              const Icon = catInfo?.icon || ShieldCheck;
              const color = catInfo?.color || 'bg-primary';
              return (
                <div key={cat} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className={`${color} px-6 py-4 flex items-center gap-3`}>
                    <Icon className="w-5 h-5 text-white" />
                    <h3 className="text-white font-bold">{cat}</h3>
                    <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{courseList.length} courses</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-px bg-gray-100">
                    {courseList.map((course) => (
                      <div key={course} className="bg-white px-5 py-3 flex items-start gap-2 hover:bg-primary-50 transition-colors">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2" />
                        <span className="text-sm text-gray-700">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-100 mb-8">Register free and access our full library of programmes and resources.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/register" className="bg-accent text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-accent-light transition-colors">Register Free</a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors">Enquire Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}
