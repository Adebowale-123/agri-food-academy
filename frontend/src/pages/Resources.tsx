import { useQuery } from '@tanstack/react-query';
import { Download, FileText, Star } from 'lucide-react';
import api from '../services/api';
import { Resource } from '../types';
import { useAuthStore } from '../store/auth';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Badge from '../components/ui/Badge';
import { Link } from 'react-router-dom';

function formatSize(bytes?: number) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function Resources() {
  const { isAuthenticated } = useAuthStore();

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: () => api.get('/resources').then((r) => r.data),
  });

  function handleDownload(resource: Resource) {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    window.open(`/api/resources/${resource.id}/download`, '_blank');
  }

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Free Resources</h1>
          <p className="text-primary-100 text-lg">Download guides, templates, and checklists — free for registered members.</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {!isAuthenticated() && (
            <div className="bg-accent/20 border border-accent rounded-xl p-5 mb-8 flex items-center justify-between">
              <p className="text-gray-700 font-medium">Login or register to download resources for free.</p>
              <Link to="/register" className="btn-primary text-sm">Register Free</Link>
            </div>
          )}

          {isLoading ? (
            <LoadingSpinner />
          ) : !resources || resources.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No resources yet</h3>
              <p className="text-gray-400 text-sm">Free guides, templates, and checklists will be available here soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="card p-6 flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {resource.featured && <Star className="w-4 h-4 text-accent fill-accent" />}
                      <h3 className="font-bold text-gray-900">{resource.title}</h3>
                    </div>
                    {resource.description && <p className="text-gray-500 text-sm mb-2">{resource.description}</p>}
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <Badge variant="green">{resource.category}</Badge>
                      <span className="uppercase">{resource.fileType}</span>
                      {resource.fileSize && <span>{formatSize(resource.fileSize)}</span>}
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors flex-shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    {isAuthenticated() ? 'Download' : 'Login to Download'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
