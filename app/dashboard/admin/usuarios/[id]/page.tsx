"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import UserForm from "@/components/admin/users/UserForm"
import { useAuth } from "@/app/providers/AuthProvider"

export default function EditUsuarioPage() {
  const params = useParams() as { id: string }
  const router = useRouter()
  const { user, isLoading, hasRole } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || !hasRole(["administrador"]))) {
      router.replace("/dashboard")
    }
  }, [isLoading, user, hasRole, router])

  const idNum = Number(params.id)

  return (
    <div className="p-6 space-y-6">
      <UserForm mode="edit" userId={idNum} />
    </div>
  )
}
