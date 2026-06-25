export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  phone?: string;
  country?: string;
  createdAt?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  faculty: string;
  price: number;
  currency: string;
  thumbnail?: string;
  duration?: string;
  level: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  modules?: CourseModule[];
  _count?: { enrollments: number };
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  order: number;
  materials: CourseMaterial[];
  _count?: { materials: number };
}

export interface CourseMaterial {
  id: string;
  moduleId: string;
  title: string;
  type: string;
  fileUrl: string;
  fileName: string;
  fileSize?: number;
  order: number;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  paymentRef?: string;
  amount?: number;
  currency: string;
  paidAt?: string;
  createdAt: string;
  course?: Course;
  user?: { id: string; name: string; email: string };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location?: string;
  type: 'webinar' | 'physical' | 'hybrid';
  registrationUrl?: string;
  image?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  category: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  author?: { id: string; name: string };
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
  fileName: string;
  fileSize?: number;
  fileType: string;
  downloads: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  recentEnrollments: Enrollment[];
  popularCourses: Course[];
}
