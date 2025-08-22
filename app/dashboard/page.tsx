import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Heart, Shield, FileText, Users, AlertTriangle, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen de tu actividad y seguros</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguros Activos</CardTitle>
            <Shield className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-blue-100">Automóvil, Sepelio, Accidentes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotizaciones</CardTitle>
            <FileText className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-100">Este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recomendados</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-purple-100">Personas referidas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Siniestros</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-orange-100">En proceso</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Acciones Rápidas</span>
            </CardTitle>
            <CardDescription>Accede rápidamente a las funciones más utilizadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/dashboard/cotizar/auto">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-blue-200 hover:border-blue-400">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Car className="w-8 h-8 text-blue-600" />
                    <span className="text-sm font-medium">Cotizar Automóvil</span>
                  </div>
                </Card>
              </Link>
              <Link href="/dashboard/cotizar/sepelio">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-green-200 hover:border-green-400">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Heart className="w-8 h-8 text-green-600" />
                    <span className="text-sm font-medium">Cotizar Sepelio</span>
                  </div>
                </Card>
              </Link>
              <Link href="/dashboard/cotizar/accidentes">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-purple-200 hover:border-purple-400">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <span className="text-sm font-medium">Cotizar Accidentes</span>
                  </div>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span>Actividad Reciente</span>
            </CardTitle>
            <CardDescription>Últimas acciones realizadas en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nueva cotización de automóvil</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Póliza de sepelio renovada</p>
                  <p className="text-xs text-gray-500">Hace 1 día</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Recomendación enviada</p>
                  <p className="text-xs text-gray-500">Hace 3 días</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
