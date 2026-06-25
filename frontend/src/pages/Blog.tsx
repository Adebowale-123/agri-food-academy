import { useQuery } from '@tanstack/react-query';
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
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 text-white text-center">
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
            <div className="text-center py-20 text-gray-400">No posts yet. Check back soon.</div>
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
