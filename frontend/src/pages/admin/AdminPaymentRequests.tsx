import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CheckCircle, XCircle, Clock, User, BookOpen, Calendar, Hash } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface PaymentRequest {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  currency: string;
  bankRef: string;
  transferDate: string;
  note?: string;
  reviewNote?: string;
  createdAt: string;
  user: { id: string; name: string; email: string };
  course: { id: string; title: string; price: number; currency: string };
}

const STATUS_STYLES = {
  pending:  'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function AdminPaymentRequests() {
  const queryClient = useQueryClient();
  const [rejectModal, setRejectModal] = useState<{ id: string; name: string } | null>(null);
  const [rejectNote, setRejectNote] = useState('');

  const { data: requests, isLoading } = useQuery<PaymentRequest[]>({
    queryKey: ['admin-payment-requests'],
    queryFn: () => api.get('/payments/requests').then((r) => r.data),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => api.post(`/payments/requests/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-payment-requests'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reviewNote }: { id: string; reviewNote: string }) =>
      api.post(`/payments/requests/${id}/reject`, { reviewNote }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-payment-requests'] });
      setRejectModal(null);
      setRejectNote('');
    },
  });

  const pending = requests?.filter((r) => r.status === 'pending') || [];
  const reviewed = requests?.filter((r) => r.status !== 'pending') || [];

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Payment Requests</h1>
        <p className="text-gray-500 mt-1">Review bank transfer submissions and grant course access</p>
      </div>

      {isLoading ? <LoadingSpinner /> : (
        <>
          {/* Pending */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-900">Pending Review</h2>
              {pending.length > 0 && (
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
              )}
            </div>

            {pending.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
                <Clock className="w-10 h-10 mx-auto mb-2 text-gray-200" />
                No pending payment requests
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((req) => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    onApprove={() => approveMutation.mutate(req.id)}
                    onReject={() => setRejectModal({ id: req.id, name: req.user.name })}
                    approving={approveMutation.isPending && approveMutation.variables === req.id}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Reviewed */}
          {reviewed.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Previously Reviewed</h2>
              <div className="space-y-3">
                {reviewed.map((req) => (
                  <RequestCard key={req.id} req={req} readonly />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-gray-900 mb-1">Reject Payment Request</h3>
            <p className="text-sm text-gray-500 mb-4">Provide a reason for <strong>{rejectModal.name}</strong> (optional — will be included in their email).</p>
            <textarea
              rows={3}
              placeholder="e.g. Reference number not found, please resend..."
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setRejectModal(null)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={() => rejectMutation.mutate({ id: rejectModal.id, reviewNote: rejectNote })}
                disabled={rejectMutation.isPending}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-red-700 disabled:opacity-60"
              >
                {rejectMutation.isPending ? 'Rejecting...' : 'Reject Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RequestCard({
  req,
  onApprove,
  onReject,
  approving,
  readonly,
}: {
  req: PaymentRequest;
  onApprove?: () => void;
  onReject?: () => void;
  approving?: boolean;
  readonly?: boolean;
}) {
  const currency = req.currency === 'GBP' ? '£' : '₦';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[req.status]}`}>
              {req.status}
            </span>
            <span className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span><strong>{req.user.name}</strong> — {req.user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>{req.course.title}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Hash className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>Ref: <strong className="text-primary">{req.bankRef}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span>Transferred: {req.transferDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="font-bold text-green-600 text-lg">{currency}{req.amount.toLocaleString()}</span>
            {req.note && <span className="text-gray-400 italic">"{req.note}"</span>}
          </div>

          {req.reviewNote && (
            <p className="text-xs text-red-500 italic">Rejection note: {req.reviewNote}</p>
          )}
        </div>

        {!readonly && req.status === 'pending' && (
          <div className="flex gap-2 sm:flex-col sm:items-end">
            <button
              onClick={onApprove}
              disabled={approving}
              className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-60"
            >
              <CheckCircle className="w-4 h-4" />
              {approving ? 'Approving...' : 'Approve'}
            </button>
            <button
              onClick={onReject}
              className="flex items-center gap-1.5 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
