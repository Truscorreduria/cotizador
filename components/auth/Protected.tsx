"use client"

import { ReactNode, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "../../app/providers/AuthProvider"

type ProtectedProps = {
  children: ReactNode
  // mostrar mientras carga
  fallback?: ReactNode
}

export default function Protected({ children, fallback = null }: ProtectedProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const next = encodeURIComponent(pathname || "/")
      router.replace(`/login?next=${next}`)
    }
  }, [isAuthenticated, isLoading, pathname, router])

  if (isLoading) return <>{fallback}</>
  if (!isAuthenticated) return null
  return <>{children}</>
}
