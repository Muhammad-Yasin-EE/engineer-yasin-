export interface CourseTestItem {
  id: string
  title: string
  branch: 'army' | 'navy' | 'paf' | 'issb'
  courseSlug: string
  courseName: string
  type: 'non-verbal' | 'verbal' | 'academic'
  testNumber: number
  totalQuestions: number
  timeMinutes: number
  passingScore: number
}

// Generate 20+ Tests for each type for a given course
export function generateCourseTests(
  branch: 'army' | 'navy' | 'paf' | 'issb',
  courseSlug: string,
  courseName: string
): CourseTestItem[] {
  const tests: CourseTestItem[] = []

  // 1. Non-Verbal Intelligence Series (Test 1 to 20)
  for (let i = 1; i <= 20; i++) {
    tests.push({
      id: `${courseSlug}-non-verbal-test-${i}`,
      title: `${courseName} Non-Verbal Intelligence Test ${i}`,
      branch,
      courseSlug,
      courseName,
      type: 'non-verbal',
      testNumber: i,
      totalQuestions: 64,
      timeMinutes: 30,
      passingScore: 50
    })
  }

  // 2. Verbal Intelligence Series (Test 1 to 20)
  for (let i = 1; i <= 20; i++) {
    tests.push({
      id: `${courseSlug}-verbal-test-${i}`,
      title: `${courseName} Verbal Intelligence Test ${i}`,
      branch,
      courseSlug,
      courseName,
      type: 'verbal',
      testNumber: i,
      totalQuestions: 84,
      timeMinutes: 30,
      passingScore: 50
    })
  }

  // 3. Academic Screening Series (Test 1 to 20)
  for (let i = 1; i <= 20; i++) {
    tests.push({
      id: `${courseSlug}-academic-test-${i}`,
      title: `${courseName} Academic Screening Test ${i}`,
      branch,
      courseSlug,
      courseName,
      type: 'academic',
      testNumber: i,
      totalQuestions: 50,
      timeMinutes: 25,
      passingScore: 50
    })
  }

  return tests
}

// All major Armed Forces Commission Courses Mapping
export const ARMED_FORCES_COURSES = [
  // Pak Army
  { branch: 'army', slug: 'pma-long-course', name: 'PMA Long Course' },
  { branch: 'army', slug: 'tcc', name: 'Technical Cadet Course (TCC)' },
  { branch: 'army', slug: 'lcc', name: 'Lady Cadet Course (LCC)' },
  { branch: 'army', slug: 'afns', name: 'AFNS Nursing Service' },
  { branch: 'army', slug: 'soldier', name: 'Pak Army Soldier' },
  { branch: 'army', slug: 'dssc', name: 'Direct Short Service (DSSC)' },
  { branch: 'army', slug: 'amc', name: 'Army Medical College (AMC)' },

  // Pak Navy
  { branch: 'navy', slug: 'pn-cadet', name: 'PN Cadet Permanent Commission' },
  { branch: 'navy', slug: 'ssc', name: 'Short Service Commission (SSC)' },
  { branch: 'navy', slug: 'marines', name: 'Pak Marines' },
  { branch: 'navy', slug: 'sailor', name: 'Pak Navy Sailor' },
  { branch: 'navy', slug: 'navy-pnec', name: 'PNEC Engineering Cadet' },

  // Pak Air Force
  { branch: 'paf', slug: 'gd-pilot', name: 'PAF General Duty Pilot (GD Pilot)' },
  { branch: 'paf', slug: 'aeronautical-engineering', name: 'CAE Aeronautical Engineering' },
  { branch: 'paf', slug: 'air-defence', name: 'PAF Air Defence' },
  { branch: 'paf', slug: 'admin', name: 'Admin & Special Duties' },
  { branch: 'paf', slug: 'airmen', name: 'PAF Airmen' },
  { branch: 'paf', slug: 'accounts', name: 'PAF Accounts Branch' },
  { branch: 'paf', slug: 'logistics', name: 'PAF Logistics Branch' },
  { branch: 'paf', slug: 'it', name: 'PAF Information Technology (IT)' }
] as const
