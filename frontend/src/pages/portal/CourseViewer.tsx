import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronDown, Download, FileText, Video, FileSpreadsheet, ArrowLeft, Award, CheckCircle, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { CourseModule } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const FILE_ICONS: Record<string, any> = {
  pdf: FileText,
  video: Video,
  mp4: Video,
  pptx: FileSpreadsheet,
  doc: FileText,
  docx: FileText,
};

function formatSize(bytes?: number) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function CourseViewer() {
  const { id } = useParams<{ id: string }>();
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [completeError, setCompleteError] = useState('');
  const queryClient = useQueryClient();

  const { data: modules, isLoading } = useQuery<CourseModule[]>({
    queryKey: ['course-materials', id],
    queryFn: () => api.get(`/courses/${id}/materials`).then((r) => r.data),
  });

  const { data: enrollmentData, isLoading: checkingEnrollment } = useQuery<{
    enrolled: boolean;
    enrollment: { id: string; status: string; certificate?: { id: string; certificateNumber: string } } | null;
  }>({
    queryKey: ['enrollment-check', id],
    queryFn: () => api.get(`/enrollments/check/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const completeMutation = useMutation({
    mutationFn: () => api.post(`/enrollments/complete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollment-check', id] });
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
      setCompleteError('');
    },
    onError: (err: any) => {
      setCompleteError(err.response?.data?.error || 'Failed to mark complete. Try again.');
    },
  });

  const enrollment = enrollmentData?.enrollment;
  const isCompleted = enrollment?.status === 'completed';
  const hasCertificate = !!enrollment?.certificate;

  if (isLoading) return <div className="pt-16"><LoadingSpinner /></div>;

  return (
    <div className="pt-16 min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/portal/courses" className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to My Courses
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">Course Materials</h1>
            <p className="text-gray-500">Click on a module to expand and download materials</p>
          </div>

          {/* Completion / Certificate controls */}
          {!checkingEnrollment && enrollment && (
            <div className="flex flex-col items-end gap-2">
              {isCompleted ? (
                <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" /> Completed
                </div>
              ) : (
                <button
                  onClick={() => completeMutation.mutate()}
                  disabled={completeMutation.isPending}
                  className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors disabled:opacity-60"
                >
                  {completeMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Marking complete...</>
                  ) : (
                    <><CheckCircle className="w-4 h-4" /> Mark as Complete</>
                  )}
                </button>
              )}
              {hasCertificate && (
                <a
                  href={`/api/certificates/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary-light transition-colors"
                >
                  <Award className="w-4 h-4" /> Download Certificate
                </a>
              )}
              {completeError && (
                <p className="text-red-500 text-xs">{completeError}</p>
              )}
            </div>
          )}
        </div>

        {/* Certificate banner — shown after just completing */}
        {isCompleted && hasCertificate && (
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <p className="text-white font-bold">Certificate Issued!</p>
                <p className="text-green-100 text-sm">Certificate No: {enrollment?.certificate?.certificateNumber}</p>
              </div>
            </div>
            <a
              href={`/api/certificates/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg text-sm hover:bg-green-50 transition-colors flex-shrink-0"
            >
              Download PDF
            </a>
          </div>
        )}

        {!modules || modules.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">No materials have been uploaded for this course yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {modules.map((module, idx) => {
              const isOpen = openModule === module.id;
              return (
                <div key={module.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenModule(isOpen ? null : module.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-gray-900">{module.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{module.materials.length} file{module.materials.length !== 1 ? 's' : ''}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100">
                      {module.materials.length === 0 ? (
                        <p className="px-5 py-4 text-sm text-gray-400">No files in this module yet.</p>
                      ) : (
                        module.materials.map((mat) => {
                          const Icon = FILE_ICONS[mat.type] || FileText;
                          return (
                            <div key={mat.id} className="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                                  <Icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{mat.title}</p>
                                  <p className="text-xs text-gray-400 uppercase">{mat.type} {formatSize(mat.fileSize) && `• ${formatSize(mat.fileSize)}`}</p>
                                </div>
                              </div>
                              <a
                                href={mat.fileUrl}
                                download={mat.fileName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-primary text-sm font-medium hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                <Download className="w-4 h-4" /> Download
                              </a>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
