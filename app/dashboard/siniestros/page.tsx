"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Clock, FileText, Upload } from 'lucide-react'

const siniestros = [
  {
    id: 1,
    numero: "SIN-2024-001",
    tipo: "Automóvil",
    fecha: "2024-01-10",
    descripcion: "Colisión en intersección",
    estado: "En Proceso",
    poliza: "AUTO-2024-001"
  },
  {
    id: 2,
    numero: "SIN-2023-045",
    tipo: "Accidentes",
    fecha: "2023-12-15",
    descripcion: "Accidente laboral",
    estado: "Cerrado",
    poliza: "ACC-2024-001"
  }
]

export default function SiniestrosPage() {
  const [formData, setFormData] = useState({
    tipoSeguro: "",
    poliza: "",
    fechaIncidente: "",
    lugarIncidente: "",
    descripcion: "",
    contacto: "",
    email: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Siniestro reportado:", formData)
    // Reset form
    setFormData({
      tipoSeguro: "",
      poliza: "",
      fechaIncidente: "",
      lugarIncidente: "",
      descripcion: "",
      contacto: "",
      email: ""
    })
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Cerrado": return "bg-green-100 text-green-800"
      case "En Proceso": return "bg-blue-100 text-blue-800"
      case "Pendiente": return "bg-yellow-100 text-yellow-800"
      case "Rechazado": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Reporte de Siniestros</h1>
        <p className="text-gray-600">Reporta incidentes y da seguimiento a tus siniestros</p>
      </div>

      {/* Información de Contacto de Emergencia */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Línea de Emergencia 24/7</h3>
              <p className="text-red-700 mb-2">Para emergencias inmediatas, llama directamente:</p>
              <div className="space-y-1">
                <p className="text-xl font-bold text-red-900">📞 +1-800-TRUST-24</p>
                <p className="text-sm text-red-600">Disponible las 24 horas, los 7 días de la semana</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de Reporte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Reportar Siniestro</span>
            </CardTitle>
            <CardDescription>
              Complete todos los datos del incidente para procesar su reporte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoSeguro">Tipo de Seguro *</Label>
                  <Select value={formData.tipoSeguro} onValueChange={(value) => setFormData({...formData, tipoSeguro: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automovil">Seguro de Automóvil</SelectItem>
                      <SelectItem value="sepelio">Seguro de Sepelio</SelectItem>
                      <SelectItem value="accidentes">Seguro de Accidentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poliza">Número de Póliza *</Label>
                  <Input
                    id="poliza"
                    value={formData.poliza}
                    onChange={(e) => setFormData({...formData, poliza: e.target.value})}
                    placeholder="Ej: AUTO-2024-001"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaIncidente">Fecha del Incidente *</Label>
                  <Input
                    id="fechaIncidente"
                    type="date"
                    value={formData.fechaIncidente}
                    onChange={(e) => setFormData({...formData, fechaIncidente: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contacto">Teléfono de Contacto *</Label>
                  <Input
                    id="contacto"
                    value={formData.contacto}
                    onChange={(e) => setFormData({...formData, contacto: e.target.value})}
                    placeholder="+1234567890"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email de Contacto</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lugarIncidente">Lugar del Incidente *</Label>
                <Input
                  id="lugarIncidente"
                  value={formData.lugarIncidente}
                  onChange={(e) => setFormData({...formData, lugarIncidente: e.target.value})}
                  placeholder="Dirección exacta donde ocurrió el incidente"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción Detallada del Incidente *</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Describa detalladamente lo que ocurrió, incluyendo circunstancias, daños, personas involucradas, etc."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Documentos de Soporte</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Adjunte fotos, reportes policiales, facturas, etc.
                  </p>
                  <Button variant="outline" size="sm">
                    Seleccionar Archivos
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Información Importante:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Reporte el siniestro lo antes posible</li>
                      <li>Conserve todos los documentos relacionados</li>
                      <li>No admita culpabilidad en el lugar del incidente</li>
                      <li>Tome fotos si es seguro hacerlo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Enviar Reporte de Siniestro
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Historial de Siniestros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Mis Siniestros</span>
            </CardTitle>
            <CardDescription>
              Historial y seguimiento de tus siniestros reportados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {siniestros.map((siniestro) => (
                <Card key={siniestro.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {siniestro.numero}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {siniestro.tipo} - Póliza: {siniestro.poliza}
                        </p>
                      </div>
                      <Badge className={getStatusColor(siniestro.estado)}>
                        {siniestro.estado}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">
                        <strong>Fecha:</strong> {siniestro.fecha}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Descripción:</strong> {siniestro.descripcion}
                      </p>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        Descargar Reporte
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proceso de Siniestros */}
      <Card>
        <CardHeader>
          <CardTitle>¿Cómo funciona el proceso de siniestros?</CardTitle>
          <CardDescription>
            Conoce los pasos que seguimos para procesar tu siniestro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Reporte</h4>
              <p className="text-sm text-gray-600">
                Reporta tu siniestro a través de este formulario o por teléfono
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Evaluación</h4>
              <p className="text-sm text-gray-600">
                Nuestro equipo evalúa tu caso y solicita documentación adicional si es necesario
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Procesamiento</h4>
              <p className="text-sm text-gray-600">
                Procesamos tu siniestro según los términos de tu póliza
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Resolución</h4>
              <p className="text-sm text-gray-600">
                Te notificamos la resolución y procedemos con el pago si aplica
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
