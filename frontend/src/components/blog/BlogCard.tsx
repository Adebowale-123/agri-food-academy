import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import Badge from '../ui/Badge';

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <div className="card overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-primary-50 to-surface-dark overflow-hidden">
        {post.thumbnail ? (
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-200">
            <svg viewBox="0 0 100 60" className="w-24 opacity-20" fill="currentColor">
              <rect x="5" y="5" width="90" height="10" rx="2" />
              <rect x="5" y="22" width="70" height="6" rx="2" />
              <rect x="5" y="35" width="80" height="6" rx="2" />
              <rect x="5" y="48" width="60" height="6" rx="2" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <Badge variant="green" className="mb-3">{post.category}</Badge>
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">{post.title}</h3>
        {post.excerpt && <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-3">
            {post.author && (
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author.name}</span>
            )}
            {date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{date}</span>}
          </div>
          <Link to={`/blog/${post.slug}`} className="text-primary font-medium hover:underline">Read →</Link>
        </div>
      </div>
    </div>
  );
}
