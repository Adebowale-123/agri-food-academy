import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import api from '../services/api';
import CourseCard from '../components/courses/CourseCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Course } from '../types';

const FACULTIES = ['All', 'Food Safety & Quality', 'Agro-Processing', 'Product Innovation', 'Business & Entrepreneurship', 'Technology & Digital', 'Sustainability & Regulatory'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses() {
  const [faculty, setFaculty] = useState('All');
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => api.get('/courses').then((r) => r.data),
  });

  const filtered = (courses || []).filter((c) => {
    const matchFaculty = faculty === 'All' || c.faculty === faculty;
    const matchLevel = level === 'All' || c.level === level;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchFaculty && matchLevel && matchSearch;
  });

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-primary-100 text-lg">Practical, expert-led courses designed for agri-food professionals in Nigeria and the UK.</p>
        </div>
      </section>

      <section className="py-10 bg-surface border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="input w-auto min-w-48 bg-white"
            >
              {FACULTIES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="input w-auto bg-white"
            >
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl mb-2">No courses found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-6">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
