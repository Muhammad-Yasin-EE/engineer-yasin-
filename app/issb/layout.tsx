import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISSB Prep Online | Free & Premium Practice Tests - Engineer Yasin',
  description:
    'Best ISSB preparation online. Get premium practice tests for Pakistan Armed Forces (PMA, PAF, Navy). Master Psychologist Tests (TAT, WAT, SCT), GTO Tasks, and Deputy President Interviews.',
  keywords: [
    'ISSB', 'ISSB prep', 'ISSB Pakistan', 'ISSB preparation', 'GTO tasks', 'ISSB psychology tests',
    'Deputy President interview', 'PMA Long Course ISSB', 'WAT SCT TAT practice online',
    'Group testing officer', 'ISSB guide 2026', 'Pakistan Army ISSB tips', 'Engineer Yasin ISSB'
  ],
  alternates: {
    canonical: 'https://www.engineeryasin.xyz/issb',
  },
  openGraph: {
    title: 'ISSB Prep Online | Free & Premium Practice Tests',
    description: 'Best ISSB preparation online. Master Psychologist Tests, GTO Tasks, and Deputy President Interviews.',
    url: 'https://www.engineeryasin.xyz/issb',
    type: 'website',
  }
}

export default function ISSBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
