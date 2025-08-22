"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, User } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trust</h1>
          <p className="text-lg text-blue-600 font-semibold">Correduría de Seguros</p>
          <p className="text-sm text-gray-600 mt-2">Tu seguridad es nuestra prioridad</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-gray-900">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Accede a tu portal de seguros de forma segura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                ¿Olvidaste tu contraseña?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Recuperar acceso
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer de seguridad */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Conexión segura SSL</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Todos tus datos están protegidos con encriptación de nivel bancario
          </p>
        </div>
      </div>
    </div>
  )
}
