import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, Users, BookOpen, ChevronDown, Lock, CheckCircle, ArrowLeft, Loader2, X, Building2 } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';
import { Course } from '../types';
import { useAuthStore } from '../store/auth';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// ── Bank details shown to students ─────────────────────────
const BANK_DETAILS = {
  bankName: 'Access Bank',
  accountName: 'Agri-Food Innovation Academy Ltd',
  accountNumber: '0123456789',
};

function BankTransferModal({
  course,
  onClose,
  onSuccess,
}: {
  course: Course;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<'details' | 'proof' | 'done'>('details');
  const [form, setForm] = useState({ bankRef: '', transferDate: '', note: '' });
  const [error, setError] = useState('');

  const submitMutation = useMutation({
    mutationFn: () =>
      api.post('/payments/bank-transfer', {
        courseId: course.id,
        bankRef: form.bankRef,
        transferDate: form.transferDate,
        note: form.note,
      }),
    onSuccess: () => { setStep('done'); onSuccess(); },
    onError: (err: any) => setError(err.response?.data?.error || 'Submission failed. Try again.'),
  });

  const currency = course.currency === 'GBP' ? '£' : '₦';
  const amount = `${currency}${course.price.toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-primary text-lg">Pay via Bank Transfer</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 — Bank details */}
        {step === 'details' && (
          <div className="p-5">
            <p className="text-sm text-gray-500 mb-4">Transfer exactly <strong className="text-primary">{amount}</strong> to the account below, then click Next to submit your proof.</p>
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Bank</span>
                <span className="font-semibold text-gray-900">{BANK_DETAILS.bankName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Account Name</span>
                <span className="font-semibold text-gray-900">{BANK_DETAILS.accountName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Account Number</span>
                <span className="font-bold text-xl text-primary tracking-wider">{BANK_DETAILS.accountNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="font-bold text-green-600 text-lg">{amount}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">Use your name as the transfer narration so we can identify your payment.</p>
            <button
              onClick={() => setStep('proof')}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors"
            >
              I've Made the Transfer →
            </button>
          </div>
        )}

        {/* Step 2 — Submit proof */}
        {step === 'proof' && (
          <div className="p-5">
            <p className="text-sm text-gray-500 mb-4">Enter your transfer details so we can verify your payment quickly.</p>
            {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference *</label>
                <input
                  type="text"
                  placeholder="e.g. GTB2026062712345"
                  value={form.bankRef}
                  onChange={(e) => setForm({ ...form, bankRef: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-400 mt-1">Found on your bank receipt or transfer notification</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Transfer *</label>
                <input
                  type="date"
                  value={form.transferDate}
                  onChange={(e) => setForm({ ...form, transferDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Note (optional)</label>
                <input
                  type="text"
                  placeholder="Any extra info for our team"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setStep('details')}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  if (!form.bankRef.trim() || !form.transferDate) {
                    setError('Please fill in the transaction reference and date.');
                    return;
                  }
                  setError('');
                  submitMutation.mutate();
                }}
                disabled={submitMutation.isPending}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-60"
              >
                {submitMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : 'Submit Proof'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Done */}
        {step === 'done' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Submitted!</h3>
            <p className="text-gray-500 text-sm mb-1">Our team has been notified and will verify your transfer.</p>
            <p className="text-gray-500 text-sm mb-6">You'll receive an email confirmation once your access is granted — usually within a few hours.</p>
            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuthStore();
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ['course', slug],
    queryFn: () => api.get(`/courses/${slug}`).then((r) => r.data),
  });

  const { data: enrollmentData, isLoading: checkingEnrollment } = useQuery<{
    enrolled: boolean;
    enrollment: { id: string; status: string } | null;
  }>({
    queryKey: ['enrollment-check', course?.id],
    queryFn: () => api.get(`/enrollments/check/${course!.id}`).then((r) => r.data),
    enabled: isAuthenticated() && !!course?.id,
  });

  const { data: pendingRequest } = useQuery<{ id: string } | null>({
    queryKey: ['payment-request-check', course?.id],
    queryFn: () =>
      api.get(`/payments/requests`).then((r) => {
        const list = r.data as any[];
        return list.find((req: any) => req.courseId === course?.id && req.status === 'pending') || null;
      }).catch(() => null),
    enabled: isAuthenticated() && !!course?.id,
  });

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => api.post('/enrollments', { courseId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['enrollment-check', course?.id] }),
  });

  if (isLoading) return <div className="pt-16"><LoadingSpinner /></div>;
  if (!course) return <div className="pt-16 text-center py-20 text-gray-400">Course not found.</div>;

  const isEnrolled = enrollmentData?.enrolled;
  const hasPendingRequest = !!pendingRequest;
  const currency = course.currency === 'GBP' ? '£' : '₦';
  const price = course.price === 0 ? 'Free' : `${currency}${course.price.toLocaleString()}`;

  return (
    <div className="pt-16">
      {showBankModal && course && (
        <BankTransferModal
          course={course}
          onClose={() => setShowBankModal(false)}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ['payment-request-check', course.id] })}
        />
      )}

      {/* Header */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/courses" className="flex items-center gap-2 text-primary-100 hover:text-white mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Badge variant="accent" className="mb-4">{course.faculty}</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-primary-100 text-lg leading-relaxed mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-primary-100">
                {course.duration && <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{course.duration}</span>}
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />{course.level}</span>
                {course._count && <span className="flex items-center gap-2"><Users className="w-4 h-4" />{course._count.enrollments} enrolled</span>}
              </div>
            </div>

            {/* Enrollment card */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl h-fit">
              <div className="text-4xl font-bold text-primary mb-1">{price}</div>
              {course.price > 0 && (
                <p className="text-gray-400 text-sm mb-4">{course.currency === 'GBP' ? 'British Pounds' : 'Nigerian Naira'}</p>
              )}

              {!isAuthenticated() ? (
                <Link to="/register" className="w-full block text-center bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mb-3">
                  Register to Enroll
                </Link>
              ) : checkingEnrollment ? (
                <div className="flex justify-center py-3 mb-3"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : isEnrolled ? (
                <Link to={`/portal/courses/${course.id}`} className="w-full block text-center bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors mb-3">
                  ✓ Access My Course
                </Link>
              ) : hasPendingRequest ? (
                <div className="w-full text-center bg-amber-50 border border-amber-200 text-amber-700 py-3 rounded-lg font-semibold text-sm mb-3">
                  ⏳ Payment Pending Review
                </div>
              ) : course.price === 0 ? (
                <button
                  onClick={() => enrollMutation.mutate(course.id)}
                  disabled={enrollMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mb-3 disabled:opacity-60"
                >
                  {enrollMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Enrolling...</> : 'Enroll Now — Free'}
                </button>
              ) : (
                <button
                  onClick={() => setShowBankModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mb-3"
                >
                  <Building2 className="w-4 h-4" /> Pay via Bank Transfer
                </button>
              )}

              <p className="text-xs text-gray-400 text-center">
                {course.price > 0 ? 'Secure bank transfer · Access granted within hours' : 'Free access to all course materials'}
              </p>

              <div className="mt-5 border-t border-gray-100 pt-5 space-y-2">
                {course.duration && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Faculty</span>
                  <span className="font-medium">{course.faculty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-primary mb-8">Course Curriculum</h2>
          {course.modules && course.modules.length > 0 ? (
            <div className="space-y-3">
              {course.modules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50"
                    onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-gray-900">{module.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{module.materials.length} files</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openModule === module.id ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {openModule === module.id && (
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {module.materials.length === 0 ? (
                        <p className="px-5 py-3 text-sm text-gray-400">No materials yet</p>
                      ) : (
                        module.materials.map((mat) => (
                          <div key={mat.id} className="flex items-center justify-between px-5 py-3">
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              <span className="text-xs uppercase font-medium bg-gray-100 px-2 py-0.5 rounded">{mat.type}</span>
                              {mat.title}
                            </div>
                            {isAuthenticated() ? <CheckCircle className="w-4 h-4 text-secondary" /> : <Lock className="w-4 h-4 text-gray-300" />}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Curriculum details coming soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
