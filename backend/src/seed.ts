import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedDatabase() {
  const adminPass = await bcrypt.hash('atal2024admin', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'ATAL Admin',
      email: 'admin@atalacademy.com',
      password: adminPass,
      role: 'admin',
      country: 'Nigeria',
    },
  });

  const course1 = await prisma.course.create({
    data: {
      title: 'Food Safety & HACCP Fundamentals',
      slug: 'food-safety-haccp-fundamentals',
      description: 'Learn the core principles of food safety management, HACCP analysis, and how to implement robust safety systems in your agri-food operation.',
      faculty: 'Food Safety & Quality',
      price: 45000,
      currency: 'NGN',
      duration: '8 weeks',
      level: 'Beginner',
      published: true,
      featured: true,
    },
  });

  const module1 = await prisma.courseModule.create({
    data: { courseId: course1.id, title: 'Introduction to Food Safety', order: 1 },
  });
  await prisma.courseModule.create({
    data: { courseId: course1.id, title: 'HACCP Principles & Implementation', order: 2 },
  });
  await prisma.courseModule.create({
    data: { courseId: course1.id, title: 'Documentation & Auditing', order: 3 },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Agro-Processing & Value Addition',
      slug: 'agro-processing-value-addition',
      description: 'Master the techniques of processing raw agricultural products into high-value goods. Covers equipment, quality control, and market-ready packaging.',
      faculty: 'Agro-Processing',
      price: 60000,
      currency: 'NGN',
      duration: '10 weeks',
      level: 'Intermediate',
      published: true,
      featured: true,
    },
  });

  await prisma.courseModule.create({
    data: { courseId: course2.id, title: 'Raw Material Selection & Handling', order: 1 },
  });
  await prisma.courseModule.create({
    data: { courseId: course2.id, title: 'Processing Technologies', order: 2 },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'UK & EU Food Regulatory Compliance',
      slug: 'uk-eu-food-regulatory-compliance',
      description: 'Navigate UK and EU food law with confidence. From labelling regulations to import requirements — essential for exporters and manufacturers.',
      faculty: 'Sustainability & Regulatory',
      price: 150,
      currency: 'GBP',
      duration: '6 weeks',
      level: 'Advanced',
      published: true,
      featured: true,
    },
  });

  await prisma.courseModule.create({
    data: { courseId: course3.id, title: 'UK Food Standards Agency Requirements', order: 1 },
  });
  await prisma.courseModule.create({
    data: { courseId: course3.id, title: 'Export Documentation & Labelling', order: 2 },
  });

  await prisma.event.createMany({
    data: [
      {
        title: 'Food Safety Masterclass — Lagos',
        description: 'A full-day hands-on masterclass on implementing HACCP and GMP in small and medium food businesses. Includes certificate of attendance.',
        date: new Date('2025-08-15T09:00:00'),
        endDate: new Date('2025-08-15T17:00:00'),
        location: 'Victoria Island, Lagos, Nigeria',
        type: 'physical',
        registrationUrl: 'https://forms.gle/example',
        featured: true,
        published: true,
      },
      {
        title: 'Webinar: Exporting Agri-food to the UK',
        description: 'Join our regulatory experts for a live webinar covering UK food import requirements, labelling rules, and building relationships with UK distributors.',
        date: new Date('2025-07-25T14:00:00'),
        location: 'Online via Zoom',
        type: 'webinar',
        registrationUrl: 'https://forms.gle/example2',
        featured: true,
        published: true,
      },
      {
        title: 'Agri-Innovation Summit 2025',
        description: 'Connect with agri-food entrepreneurs, investors, and innovators. Featuring keynote presentations, product showcases, and networking sessions.',
        date: new Date('2025-09-20T08:00:00'),
        endDate: new Date('2025-09-21T18:00:00'),
        location: 'Abuja International Conference Centre',
        type: 'physical',
        published: true,
      },
    ],
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Why HACCP is Non-Negotiable for Nigerian Food Manufacturers',
        slug: 'why-haccp-non-negotiable-nigeria',
        excerpt: 'As NAFDAC enforcement intensifies, small and medium food manufacturers must implement HACCP systems or risk losing their operating licenses.',
        content: `<p>The Hazard Analysis and Critical Control Points (HACCP) system is no longer optional for food manufacturers in Nigeria. As the National Agency for Food and Drug Administration and Control (NAFDAC) strengthens its enforcement framework, businesses without documented food safety management systems are increasingly at risk.</p><p>In this article, we break down what HACCP means, why it matters, and practical steps to implement it in your operation.</p><h2>What is HACCP?</h2><p>HACCP is a systematic preventive approach to food safety that identifies physical, chemical, and biological hazards in production processes and establishes critical control points (CCPs) to eliminate or reduce those hazards.</p><h2>The Nigeria Context</h2><p>With Nigeria's food export ambitions growing — particularly to the UK and EU — compliance with international food safety standards is essential. NAFDAC's alignment with Codex Alimentarius guidelines means that HACCP-certified operations have a significant competitive advantage.</p>`,
        category: 'Food Safety',
        authorId: admin.id,
        published: true,
        publishedAt: new Date('2025-06-01'),
      },
      {
        title: '5 Value-Addition Opportunities in Cassava Processing',
        slug: '5-value-addition-cassava-processing',
        excerpt: 'Cassava is one of Nigeria\'s most underutilised crops. Discover five high-margin products you can produce from cassava and the processing techniques involved.',
        content: `<p>Nigeria is the world's largest producer of cassava, yet most of it is consumed locally as a basic food rather than transformed into high-value products. This represents a massive opportunity for agri-food entrepreneurs.</p><h2>1. Cassava Flour</h2><p>Cassava flour can substitute wheat flour in many baked goods. With gluten-free diets growing globally, cassava flour commands premium prices in export markets.</p><h2>2. High Quality Cassava Starch</h2><p>Industrial cassava starch is in high demand for paper manufacturing, textiles, and pharmaceuticals.</p><h2>3. Garri for Export</h2><p>Premium-grade garri, properly processed and hygienically packaged, finds ready markets in the Nigerian diaspora across the UK, US, and Europe.</p>`,
        category: 'Agro-Processing',
        authorId: admin.id,
        published: true,
        publishedAt: new Date('2025-05-20'),
      },
      {
        title: 'Understanding UK Food Labelling Requirements for Exporters',
        slug: 'uk-food-labelling-requirements-exporters',
        excerpt: 'Planning to export food products to the UK? Here\'s what you must know about post-Brexit food labelling rules before your first shipment.',
        content: `<p>Since Brexit, the UK has established its own set of food labelling regulations, separate from EU rules. For Nigerian exporters targeting the lucrative UK market, understanding these requirements is essential to avoid costly rejections at the border.</p><h2>Mandatory Label Information</h2><p>All food products sold in the UK must carry: the name of the food, a list of ingredients, allergen information, a "best before" or "use by" date, storage conditions, the name and address of the food business operator (must be UK-based), country of origin for certain products, and net quantity.</p><h2>UK Responsible Person Requirement</h2><p>You must have a UK-based importer or distributor whose name and address appears on the label. This is non-negotiable since 2021.</p>`,
        category: 'Regulatory',
        authorId: admin.id,
        published: true,
        publishedAt: new Date('2025-06-10'),
      },
    ],
  });

  await prisma.resource.createMany({
    data: [
      {
        title: 'HACCP Implementation Checklist',
        description: 'A step-by-step checklist for implementing HACCP in small and medium food businesses.',
        category: 'Food Safety',
        fileUrl: '/uploads/resources/placeholder.pdf',
        fileName: 'haccp-checklist.pdf',
        fileType: 'pdf',
        featured: true,
        published: true,
      },
      {
        title: 'Nigeria Export Documentation Guide',
        description: 'Complete guide to the documents required to export food products from Nigeria.',
        category: 'Regulatory',
        fileUrl: '/uploads/resources/placeholder.pdf',
        fileName: 'export-docs-guide.pdf',
        fileType: 'pdf',
        published: true,
      },
      {
        title: 'Cassava Processing Business Plan Template',
        description: 'A ready-to-use business plan template for cassava processing entrepreneurs.',
        category: 'Agro-Processing',
        fileUrl: '/uploads/resources/placeholder.pdf',
        fileName: 'cassava-business-plan.pdf',
        fileType: 'pdf',
        featured: true,
        published: true,
      },
    ],
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: 'siteName', value: 'Agri-Food Innovation Academy' },
      { key: 'siteTagline', value: 'Building Competence. Driving Compliance. Inspiring Innovation.' },
      { key: 'email', value: 'info@afiaacademy.com' },
      { key: 'phone', value: '+234 810 123 4567' },
      { key: 'phoneUK', value: '+44 20 8133 1985' },
      { key: 'addressNigeria', value: 'No. 12 Innovation Drive, Agri-Food Hub, Abuja, Nigeria' },
      { key: 'addressUK', value: 'United Kingdom' },
      { key: 'website', value: 'www.afiaacademy.com' },
      { key: 'about', value: 'Agri-Food Innovation Academy (AFIA) is a professional learning and development, training, consultancy, research and workforce development organisation committed to building competent professionals, compliant businesses and innovative solutions within the agri-food, manufacturing, hospitality and agriculture sectors across Africa and beyond.' },
    ],
  });

  console.log('Seed complete. Admin: admin@atalacademy.com / atal2024admin');
}

seedDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
