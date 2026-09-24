// Rich per-course content (audience / outcomes / benefits / included items)
// that the real Course model has no columns for. Stored as one JSON blob in
// the existing SiteSetting table under the key "courseExtras", keyed by
// course id, so no database migration is needed.
export interface CourseExtras {
  targetAudience: string[];
  outcomes: string[];
  benefits: string[];
  whatYouReceive?: string[];
}

export function parseCourseExtras(raw?: string): Record<string, CourseExtras> {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
