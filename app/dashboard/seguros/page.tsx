import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Heart, Shield, Calendar, DollarSign, FileText, Download } from 'lucide-react'

const seguros = {
  automovil: [
    {
      id: 1,
      poliza: "AUTO-2024-001",
      vehiculo: "Toyota Corolla 2020",
      vigencia: "2024-12-31",
      prima: "$1,200/año",
      estado: "Activa",
      cobertura: "Cobertura Total"
    },
  ],
  sepelio: [
    {
      id: 1,
      poliza: "SEP-2024-001",
      plan: "Plan Familiar",
      vigencia: "2024-11-30",
      prima: "$800/año",
      estado: "Activa",
      beneficiarios: "4 personas"
    },
  ],
  accidentes: [
    {
      id: 1,
      poliza: "ACC-2024-001",
      cobertura: "Cobertura Total",
      vigencia: "2024-10-15",
      prima: "$2,000/año",
      estado: "Activa",
      suma: "$50,000"
    },
  ]
}

export default function SegurosPage() {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Activa": return "bg-green-100 text-green-800"
      case "Por Vencer": return "bg-yellow-100 text-yellow-800"
      case "Vencida": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Mis Seguros</h1>
        <p className="text-gray-600">Administra todas tus pólizas de seguros activas</p>
      </div>

      {/* Seguros de Automóvil */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Seguros de Automóvil</CardTitle>
              <CardDescription>Pólizas activas para vehículos</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seguros.automovil.map((seguro) => (
              <Card key={seguro.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">{seguro.vehiculo}</h4>
                        <Badge className={getStatusColor(seguro.estado)}>
                          {seguro.estado}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Póliza: {seguro.poliza}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Vigencia: {seguro.vigencia}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>Prima: {seguro.prima}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>{seguro.cobertura}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button size="sm">Ver Detalles</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seguros de Sepelio */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle>Seguros de Sepelio</CardTitle>
              <CardDescription>Pólizas activas para servicios funerarios</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seguros.sepelio.map((seguro) => (
              <Card key={seguro.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">{seguro.plan}</h4>
                        <Badge className={getStatusColor(seguro.estado)}>
                          {seguro.estado}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Póliza: {seguro.poliza}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Vigencia: {seguro.vigencia}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>Prima: {seguro.prima}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>Beneficiarios: {seguro.beneficiarios}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button size="sm">Ver Detalles</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seguros de Accidentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle>Seguros de Accidentes</CardTitle>
              <CardDescription>Pólizas activas para accidentes personales</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seguros.accidentes.map((seguro) => (
              <Card key={seguro.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">{seguro.cobertura}</h4>
                        <Badge className={getStatusColor(seguro.estado)}>
                          {seguro.estado}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Póliza: {seguro.poliza}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Vigencia: {seguro.vigencia}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>Prima: {seguro.prima}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Suma Asegurada: {seguro.suma}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button size="sm">Ver Detalles</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
