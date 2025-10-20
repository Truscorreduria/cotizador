"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../app/providers/AuthProvider"
import type { UserRole } from "@/lib/types"

type RoleGuardProps = {
  roles: UserRole[]
  children: ReactNode
  redirectTo?: string // opcional, por defecto "/"
  fallback?: ReactNode // mientras carga
}

export default function RoleGuard({ roles, children, redirectTo = "/", fallback = null }: RoleGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  const allowed = isAuthenticated && user && roles.includes(user.rol)

  useEffect(() => {
    if (!isLoading && !allowed) {
      router.replace(redirectTo)
    }
  }, [allowed, isLoading, redirectTo, router])

  if (isLoading) return <>{fallback}</>
  if (!allowed) return null
  return <>{children}</>
}
