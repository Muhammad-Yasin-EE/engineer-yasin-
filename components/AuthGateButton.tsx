'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, X, LogIn, UserPlus, Shield } from 'lucide-react'

import { checkIsAuthenticated } from '@/app/actions/check-auth'

interface AuthGateButtonProps {
  href?: string
  onClick?: (e?: React.MouseEvent) => void
  label?: string
  className?: string
  children?: React.ReactNode
}

export default function AuthGateButton({ href, label, className, children, onClick }: AuthGateButtonProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    } else if (href) {
      e.preventDefault()
      router.push(href)
    }
  }

  return (
    <button onClick={handleClick} className={className} aria-label={label || 'Action'}>
      {children || label}
    </button>
  )
}
