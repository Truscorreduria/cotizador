"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Gift, Star } from 'lucide-react'

const recomendaciones = [
  {
    id: 1,
    nombre: "Ana García",
    telefono: "+1234567890",
    email: "ana@email.com",
    interes: "Automóvil",
    fecha: "2024-01-15",
    estado: "Contactado"
  },
  {
    id: 2,
    nombre: "Luis Rodríguez",
    telefono: "+1234567891",
    email: "luis@email.com",
    interes: "Sepelio",
    fecha: "2024-01-14",
    estado: "Pendiente"
  },
  {
    id: 3,
    nombre: "Carmen Morales",
    telefono: "+1234567892",
    email: "carmen@email.com",
    interes: "Accidentes",
    fecha: "2024-01-13",
    estado: "Convertido"
  }
]

export default function RecomendadosPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    interes: "",
    comentarios: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la recomendación
    console.log("Recomendación enviada:", formData)
    // Reset form
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      interes: "",
      comentarios: ""
    })
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Convertido": return "bg-green-100 text-green-800"
      case "Contactado": return "bg-blue-100 text-blue-800"
      case "Pendiente": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Programa de Recomendados</h1>
        <p className="text-gray-600">Refiere personas y obtén beneficios por cada cliente nuevo</p>
      </div>

      {/* Beneficios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Gift className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Bonificación</h3>
                <p className="text-blue-100">$50 por referido</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Descuentos</h3>
                <p className="text-green-100">10% en tu próxima póliza</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Total Referidos</h3>
                <p className="text-purple-100">8 personas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de Recomendación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5 text-blue-600" />
              <span>Recomendar Persona</span>
            </CardTitle>
            <CardDescription>
              Completa los datos de la persona que quieres recomendar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Nombre y apellidos"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="+1234567890"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@ejemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interes">Tipo de Seguro de Interés</Label>
                <Select value={formData.interes} onValueChange={(value) => setFormData({...formData, interes: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de seguro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automovil">Seguro de Automóvil</SelectItem>
                    <SelectItem value="sepelio">Seguro de Sepelio</SelectItem>
                    <SelectItem value="accidentes">Seguro de Accidentes</SelectItem>
                    <SelectItem value="todos">Todos los seguros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios Adicionales</Label>
                <Textarea
                  id="comentarios"
                  value={formData.comentarios}
                  onChange={(e) => setFormData({...formData, comentarios: e.target.value})}
                  placeholder="Información adicional sobre la persona o su situación..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Enviar Recomendación
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Recomendaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Mis Recomendaciones</span>
            </CardTitle>
            <CardDescription>
              Historial de personas que has recomendado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recomendaciones.map((recomendacion) => (
                <div key={recomendacion.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{recomendacion.nombre}</h4>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-600">{recomendacion.telefono}</p>
                        {recomendacion.email && (
                          <p className="text-sm text-gray-600">{recomendacion.email}</p>
                        )}
                        <p className="text-sm text-blue-600">Interés: {recomendacion.interes}</p>
                        <p className="text-xs text-gray-500">Referido el {recomendacion.fecha}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(recomendacion.estado)}>
                      {recomendacion.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
