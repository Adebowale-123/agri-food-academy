export const LEVEL_COURSE_LIST: Record<string, { cat: string; courses: string[] }[]> = {
  Foundation: [
    {
      cat: 'Food Safety & Compliance',
      courses: [
        'Introduction to HACCP for Food Businesses (Foundation Level)',
        'Food Safety & Hygiene Level 2 for Food Handlers (UK Standard)',
        'Good Manufacturing Practice (GMP) for Food Manufacturing Compliance',
        "Food Allergen Management & Natasha's Law Compliance",
      ],
    },
    {
      cat: 'Food Entrepreneurship & Industry',
      courses: [
        'Food Processing for Entrepreneurs: From Idea to Production',
        'Small Food Factory Setup & Operational Management',
        'Food Manufacturing Business Planning & Costing',
        'Food Product Registration & Regulatory Compliance (UK & Export)',
      ],
    },
    {
      cat: 'Health, Safety & Environment (HSE)',
      courses: [
        'Introduction to Health, Safety & Environment (HSE) in Food Manufacturing',
        'Workplace Hazard Identification & Risk Assessment (Food Industry)',
        'Fire Safety & Emergency Response in Food Factories',
      ],
    },
    {
      cat: 'Quality Management & Systems',
      courses: [
        'Introduction to Quality Management Systems in Food Manufacturing',
      ],
    },
  ],
  Intermediate: [
    {
      cat: 'Food Safety & Compliance',
      courses: [
        'HACCP Level 2: Practical Implementation for Food Operations',
        'Internal Food Safety Auditing (HACCP & GMP Systems)',
      ],
    },
    {
      cat: 'Food Manufacturing Engineering',
      courses: [
        'Unit Operations in Food Processing: Principles & Industrial Applications',
        'Temperature Control & Thermal Processing in Food Manufacturing',
        'Sanitation Engineering & Cleaning Systems (CIP) in Food Factories',
      ],
    },
    {
      cat: 'Food Science & Laboratory Systems',
      courses: [
        'Food Microbiology for Food Manufacturing & Safety Control',
        'Environmental Monitoring & Hygiene Verification in Food Factories',
        'Microbiological Sampling & Testing for Food Safety Compliance',
        'Shelf-Life Testing & Product Stability for Food Products',
      ],
    },
    {
      cat: 'Product Development & Innovation',
      courses: [
        'Food Product Development & Commercialisation (Concept to Market)',
        'Food Formulation & Ingredient Functionality',
        'Sensory Evaluation & Consumer Testing for Food Products',
      ],
    },
    {
      cat: 'Quality Management & Systems',
      courses: [
        'Root Cause Analysis & CAPA for Food Industry Compliance',
        'Quality Documentation, Traceability & Record Control Systems',
        'Supplier Quality Management & Raw Material Assurance',
        'Quality Control Techniques & In-Process Inspection in Food Production',
        'Internal Quality Auditing (ISO & Food Manufacturing Systems)',
      ],
    },
    {
      cat: 'Food Entrepreneurship & Industry',
      courses: [
        'Food Packaging & Labelling Compliance (UK & International Standards)',
      ],
    },
  ],
  Advanced: [
    {
      cat: 'Food Safety & Compliance',
      courses: [
        'HACCP Level 3: HACCP System Development & Management',
      ],
    },
    {
      cat: 'Food Manufacturing Engineering',
      courses: [
        'Food Processing Equipment Design & Hygienic Engineering',
        'Food Factory Design & Hygienic Layout for Compliance',
        'Airflow, Ventilation & Environmental Control in Food Production',
        'Hygienic Design of Food Processing Facilities (Advanced)',
      ],
    },
    {
      cat: 'Food Science & Laboratory Systems',
      courses: [
        'Laboratory Quality Management Systems for Food Testing Labs',
      ],
    },
    {
      cat: 'Product Development & Innovation',
      courses: [
        'Product Stability, Packaging & Shelf-Life Interaction',
        'Scaling Food Production: From Pilot Plant to Factory',
      ],
    },
    {
      cat: 'Health, Safety & Environment (HSE)',
      courses: [
        'Occupational Health & Industrial Hygiene in Food Production',
        'Incident Investigation & Root Cause Analysis for Workplace Safety',
        'Safe Machinery Operation & Lockout/Tagout Procedures',
      ],
    },
    {
      cat: 'Quality Management & Systems',
      courses: [
        'ISO 9001: Quality Management Systems for Food Industry Compliance',
        'Statistical Process Control (SPC) for Food Manufacturing Efficiency',
        'Lean Manufacturing & Continuous Improvement in Food Factories',
        'Non-Conformance Management & CAPA Systems for Food Compliance',
      ],
    },
  ],
};

export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function findLevelForCourse(title: string): string | null {
  for (const [lvl, groups] of Object.entries(LEVEL_COURSE_LIST)) {
    for (const { courses } of groups) {
      if (courses.includes(title)) return lvl;
    }
  }
  return null;
}

export function findCatForCourse(title: string): string | null {
  for (const groups of Object.values(LEVEL_COURSE_LIST)) {
    for (const { cat, courses } of groups) {
      if (courses.includes(title)) return cat;
    }
  }
  return null;
}

export function findCourseBySlug(
  level: string,
  slug: string
): { title: string; cat: string; level: string } | null {
  const groups = LEVEL_COURSE_LIST[level];
  if (!groups) return null;
  for (const { cat, courses } of groups) {
    for (const title of courses) {
      if (titleToSlug(title) === slug) {
        return { title, cat, level };
      }
    }
  }
  return null;
}
