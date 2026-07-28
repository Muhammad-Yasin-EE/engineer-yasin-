import { createClient } from '@/lib/supabase/server'
import { Metadata, ResolvingMetadata } from 'next'
import QuizClient from './QuizClient'

export async function generateMetadata(
  { params }: { params: Promise<{ quizId: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { quizId } = await params
  const supabase = await createClient()
  
  const { data } = await supabase.from('quizzes').select('*').eq('id', quizId).single()
  
  if (!data) {
    return {
      title: 'ONLINE MOCK PRACTICE TEST | ENGINEER YASIN PORTAL',
      description: 'Take timed interactive online selection mock tests with instant scoring and performance evaluation.',
    }
  }

  const title = `${(data.title || 'Practice Test').toUpperCase()} - LIVE ONLINE MOCK TEST | ENGINEER YASIN`
  const description = data.description || `Attempt this timed interactive multiple-choice question challenge for ${data.category?.toUpperCase() || 'armed forces'} selection with real timer, instant scoring and anti-cheat protection.`
  const url = `https://www.engineeryasin.xyz/prep/quiz/${quizId}`
  
  let image = '/images/hero-illustration.jpg'
  const cat = (data.category || '').toLowerCase()
  const tit = (data.title || '').toLowerCase()
  if (cat.includes('paf') || tit.includes('paf')) image = '/images/exam-paf-bg.jpg'
  else if (cat.includes('navy') || tit.includes('navy') || tit.includes('cadet')) image = '/images/exam-navy-bg.jpg'
  else if (cat.includes('army') || tit.includes('army') || tit.includes('pma')) image = '/images/exam-army-bg.jpg'
  else if (cat.includes('public') || tit.includes('psc')) image = '/images/public-service-header.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  }
}

export default async function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  return <QuizClient params={params} />
}
