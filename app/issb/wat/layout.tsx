import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISSB WORD ASSOCIATION TEST (WAT) - LIVE TIMED PSYCHOLOGICAL PRACTICE | ENGINEER YASIN',
  description: 'Practice real ISSB Word Association Tests online with 10-second automatic timer, audio buzzers, and expert psychological assessment guidance for Pakistan Army, Navy & Air Force selection.',
  openGraph: {
    title: 'ISSB WORD ASSOCIATION TEST (WAT) - LIVE TIMED PSYCHOLOGICAL PRACTICE | ENGINEER YASIN',
    description: 'Practice real ISSB Word Association Tests online with 10-second automatic timer, audio buzzers, and expert psychological assessment guidance for Pakistan Army, Navy & Air Force selection.',
    url: 'https://www.engineeryasin.xyz/issb/wat',
    type: 'website',
    images: [{ url: '/images/issb-gto.jpg', width: 1200, height: 630, alt: 'ISSB Psychological & Word Association Test Preparation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISSB WORD ASSOCIATION TEST (WAT) - LIVE TIMED PSYCHOLOGICAL PRACTICE | ENGINEER YASIN',
    description: 'Practice real ISSB Word Association Tests online with 10-second automatic timer, audio buzzers, and expert psychological assessment guidance for Pakistan Army, Navy & Air Force selection.',
    images: ['/images/issb-gto.jpg'],
  }
}

export default function WatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
