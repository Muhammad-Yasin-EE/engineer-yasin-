import { redirect } from 'next/navigation'

export const dynamic = 'force-static'

export default function ScholarshipRedirectPage() {
  redirect('/scholarships')
}
