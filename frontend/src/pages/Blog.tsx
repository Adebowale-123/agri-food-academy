import { useQuery } from '@tanstack/react-query';
import { BookOpen } from 'lucide-react';
import api from '../services/api';
import BlogCard from '../components/blog/BlogCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { BlogPost } from '../types';

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blog'],
    queryFn: () => api.get('/blog').then((r) => r.data),
  });

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog & Insights</h1>
          <p className="text-primary-100 text-lg">Expert articles, regulatory updates, and industry insights for agri-food professionals.</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : !posts || posts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No posts yet</h3>
              <p className="text-gray-400 text-sm">Expert articles and industry insights are coming soon. Check back regularly.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
