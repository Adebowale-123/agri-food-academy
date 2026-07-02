import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, BookOpen, ArrowLeft, CheckCircle, Star, Award, Gift } from 'lucide-react';
import { findCourseBySlug } from '../data/courseData';
import { getCourseDetails } from '../data/courseDetails';
import { useAuthStore } from '../store/auth';

const CAT_DESCRIPTIONS: Record<string, string> = {
  'Food Safety & Compliance':
    'This programme equips food industry professionals with the knowledge and practical skills to implement and maintain robust food safety systems, comply with UK and international regulations, and protect consumers.',
  'Food Manufacturing Engineering':
    'Designed for engineers and technical professionals, this programme covers the design, operation, and optimisation of food manufacturing equipment, processes, and facilities to the highest hygienic engineering standards.',
  'Food Science & Laboratory Systems':
    'This programme develops scientific and laboratory competence for food testing, microbiological analysis, and quality verification — essential for compliance in modern food production environments.',
  'Product Development & Innovation':
    'From concept to commercial launch, this programme guides food product developers through formulation, sensory testing, packaging, and scale-up, building the skills to bring innovative products to market.',
  'Food Entrepreneurship & Industry':
    'Built for entrepreneurs and industry managers, this programme provides practical knowledge in setting up, running, and growing a food manufacturing or processing business, covering regulations, costing, and operations.',
  'Health, Safety & Environment (HSE)':
    'This programme prepares food industry workers and supervisors to identify hazards, manage risks, and foster a culture of safety and environmental responsibility across food manufacturing sites.',
  'Quality Management & Systems':
    'Covering ISO standards, auditing, CAPA, and continuous improvement tools, this programme develops quality professionals capable of implementing and sustaining world-class quality management systems in food manufacturing.',
};

const CAT_COLORS: Record<string, string> = {
  'Food Safety & Compliance': 'bg-green-600',
  'Food Manufacturing Engineering': 'bg-blue-700',
  'Food Science & Laboratory Systems': 'bg-amber-600',
  'Product Development & Innovation': 'bg-orange-600',
  'Food Entrepreneurship & Industry': 'bg-purple-700',
  'Health, Safety & Environment (HSE)': 'bg-red-600',
  'Quality Management & Systems': 'bg-primary',
};

export default function StaticCourseDetail() {
  const { level, slug } = useParams<{ level: string; slug: string }>();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [level, slug]);

  const course = level && slug ? findCourseBySlug(level, slug) : null;

  if (!course) {
    return (
      <div className="pt-16 text-center py-20 text-gray-400">
        Course not found.{' '}
        <Link to="/courses" className="text-primary underline">
          Back to Courses
        </Link>
      </div>
    );
  }

  const description =
    CAT_DESCRIPTIONS[course.cat] ??
    'This programme is designed to build specialist knowledge and practical skills for professionals in the food industry. Full curriculum details will be published shortly.';

  const bgColor = CAT_COLORS[course.cat] ?? 'bg-primary';
  const details = getCourseDetails(course.title);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            to="/courses"
            className="flex items-center gap-2 text-primary-100 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: course info */}
            <div className="lg:col-span-2">
              <span className={`inline-block ${bgColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4`}>
                {course.cat}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-primary-100 text-lg leading-relaxed mb-6">{description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-primary-100">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />Duration TBC</span>
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />{course.level}</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" />0 enrolled</span>
              </div>
            </div>

            {/* Right: enrolment card */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl h-fit">
              <div className="text-4xl font-bold text-primary mb-1">Coming Soon</div>
              <p className="text-gray-400 text-sm mb-4">Pricing to be confirmed</p>
              {isAuthenticated() ? (
                <Link
                  to="/portal/courses"
                  className="w-full block text-center bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mb-3"
                >
                  Go to My Courses
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="w-full block text-center bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mb-3"
                >
                  Register to Enroll
                </Link>
              )}
              <p className="text-xs text-gray-400 text-center">30-day money-back guarantee</p>
              <div className="mt-5 border-t border-gray-100 pt-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium">TBC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Faculty</span>
                  <span className="font-medium text-right">{course.cat}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course content sections */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {details ? (
            <div className="space-y-8">

              {/* Who Should Attend */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-primary">Who Should Attend?</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {details.targetAudience.map((item) => (
                    <div key={item} className="flex items-center gap-2 bg-primary-50 rounded-lg px-4 py-2.5">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes + Career Benefits side by side */}
              <div className="grid lg:grid-cols-2 gap-6">

                {/* What You Will Gain */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">What Will You Gain?</h2>
                  </div>
                  <ul className="space-y-3">
                    {details.outcomes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career Benefits */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Career & Business Benefits</h2>
                  </div>
                  <ul className="space-y-3">
                    {details.benefits.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* What You Will Receive */}
              {details.whatYouReceive && (
                <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold">What You Will Receive</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {details.whatYouReceive.map((item) => (
                      <div key={item} className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enroll CTA */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">Ready to Get Started?</h3>
                <p className="text-gray-500 text-sm mb-5">
                  Register now to be notified when this course opens and secure your place.
                </p>
                <Link
                  to="/register"
                  className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-light transition-colors"
                >
                  Register to Enroll
                </Link>
              </div>
            </div>
          ) : (
            /* Fallback for courses without detailed content yet */
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-4">Course Curriculum</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium mb-1">Curriculum coming soon</p>
                <p className="text-gray-400 text-sm">
                  Full module content and materials will be published shortly.{' '}
                  <Link to="/register" className="text-primary underline">Register now</Link>{' '}
                  to be notified when this course opens.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
