import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ChevronDown, Download, FileText, Video, FileSpreadsheet, ArrowLeft } from 'lucide-react';
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

  const { data: modules, isLoading } = useQuery<CourseModule[]>({
    queryKey: ['course-materials', id],
    queryFn: () => api.get(`/courses/${id}/materials`).then((r) => r.data),
  });

  if (isLoading) return <div className="pt-16"><LoadingSpinner /></div>;

  return (
    <div className="pt-16 min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/portal/courses" className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to My Courses
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-2">Course Materials</h1>
        <p className="text-gray-500 mb-8">Click on a module to expand and download materials</p>

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
