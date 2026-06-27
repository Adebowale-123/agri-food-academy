import { BookOpen, Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';
import Badge from '../ui/Badge';

const FACULTY_COLORS: Record<string, any> = {
  'Food Safety & Compliance': 'green',
  'Food Manufacturing Engineering': 'blue',
  'Food Science & Laboratory Systems': 'orange',
  'Product Development & Innovation': 'orange',
  'Food Entrepreneurship & Industry': 'accent',
  'Health, Safety & Environment (HSE)': 'red',
  'Quality Management & Systems': 'green',
};

export default function CourseCard({ course }: { course: Course }) {
  const color = FACULTY_COLORS[course.faculty] || 'green';
  const price = course.price === 0 ? 'Free' : `${course.currency === 'GBP' ? '£' : '₦'}${course.price.toLocaleString()}`;

  return (
    <div className="card overflow-hidden group">
      <div className="relative h-44 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-30" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant={color}>{course.faculty}</Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="gray" className="text-xs">{course.level}</Badge>
        </div>
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{course.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          {course.duration && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>}
          {course._count && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course._count.enrollments} students</span>}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <Link
            to={`/courses/${course.slug}`}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
