import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, Calendar, FileText, Download,
  MessageSquare, Settings, LogOut, Menu, X, ChevronRight, CreditCard,
} from 'lucide-react';

import { useAuthStore } from '../../store/auth';

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { to: '/admin/students', icon: Users, label: 'Students' },
  { to: '/admin/events', icon: Calendar, label: 'Events' },
  { to: '/admin/blog', icon: FileText, label: 'Blog' },
  { to: '/admin/resources', icon: Download, label: 'Resources' },
  { to: '/admin/payment-requests', icon: CreditCard, label: 'Payments' },
  { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-primary-dark text-white">
      <div className="px-5 py-4 border-b border-primary-light/20">
        <div className="text-white font-extrabold text-base leading-none">Agri-Food</div>
        <div className="text-accent text-xs font-semibold tracking-widest uppercase mt-0.5">Innovation Academy</div>
        <div className="text-primary-200 text-xs mt-1">Admin Portal</div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin/dashboard'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'text-primary-200 hover:bg-primary hover:text-white'}`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-primary-light/20 p-4">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-dark text-xs font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-white leading-none">{user?.name}</p>
            <p className="text-xs text-primary-200">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-primary-200 hover:text-white text-sm w-full px-1 py-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 flex-shrink-0 flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-60 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center justify-between flex-shrink-0">
          <button className="lg:hidden p-2 rounded-md text-gray-600" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" /> Public Site
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
