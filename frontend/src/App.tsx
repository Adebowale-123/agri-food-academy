import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useAuthStore } from './store/auth';

import Home from './pages/Home';
import About from './pages/About';
import Faculties from './pages/Faculties';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import StaticCourseDetail from './pages/StaticCourseDetail';
import Events from './pages/Events';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

import PortalDashboard from './pages/portal/Dashboard';
import MyCourses from './pages/portal/MyCourses';
import CourseViewer from './pages/portal/CourseViewer';
import Profile from './pages/portal/Profile';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseForm from './pages/admin/AdminCourseForm';
import AdminStudents from './pages/admin/AdminStudents';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBlog from './pages/admin/AdminBlog';
import AdminResources from './pages/admin/AdminResources';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuthStore();
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/portal/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/faculties" element={<PublicLayout><Faculties /></PublicLayout>} />
        <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
        <Route path="/courses/preview/:level/:slug" element={<PublicLayout><StaticCourseDetail /></PublicLayout>} />
        <Route path="/courses/:slug" element={<PublicLayout><CourseDetail /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student portal */}
        <Route path="/portal/dashboard" element={<RequireAuth><PublicLayout><PortalDashboard /></PublicLayout></RequireAuth>} />
        <Route path="/portal/courses" element={<RequireAuth><PublicLayout><MyCourses /></PublicLayout></RequireAuth>} />
        <Route path="/portal/courses/:id" element={<RequireAuth><PublicLayout><CourseViewer /></PublicLayout></RequireAuth>} />
        <Route path="/portal/profile" element={<RequireAuth><PublicLayout><Profile /></PublicLayout></RequireAuth>} />

        {/* Admin portal */}
        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/new" element={<AdminCourseForm />} />
          <Route path="courses/:id/edit" element={<AdminCourseForm />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="resources" element={<AdminResources />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
