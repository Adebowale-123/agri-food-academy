import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import api from '../services/api';
import { BlogPost as BlogPostType } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Badge from '../components/ui/Badge';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery<BlogPostType>({
    queryKey: ['post', slug],
    queryFn: () => api.get(`/blog/${slug}`).then((r) => r.data),
  });

  if (isLoading) return <div className="pt-16"><LoadingSpinner /></div>;
  if (!post) return <div className="pt-16 text-center py-20 text-gray-400">Post not found.</div>;

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/blog" className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <Badge variant="green" className="mb-4">{post.category}</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center gap-5 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          {post.author && (
            <span className="flex items-center gap-2"><User className="w-4 h-4" />{post.author.name}</span>
          )}
          {date && <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{date}</span>}
        </div>

        {post.thumbnail && (
          <img src={post.thumbnail} alt={post.title} className="w-full rounded-2xl mb-8 object-cover max-h-96" />
        )}

        <div
          className="prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
