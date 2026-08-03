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
  disabled?: boolean
}

export default function AuthGateButton({ href, label, className, children, onClick, disabled }: AuthGateButtonProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return
    if (onClick) {
      onClick(e)
    } else if (href) {
      e.preventDefault()
      router.push(href)
    }
  }

  return (
    <button onClick={handleClick} className={className} disabled={disabled} aria-label={label || 'Action'}>
      {children || label}
    </button>
  )
}
