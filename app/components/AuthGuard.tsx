import React from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // Legacy AuthGuard, replaced by Supabase middleware
  return <>{children}</>;
}
