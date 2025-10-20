
// providers/ClientProviders.tsx
"use client"

import { ReactNode, useEffect, useState } from "react"
import { AuthProvider } from "./AuthProvider"

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return <AuthProvider>{children}</AuthProvider>
}
