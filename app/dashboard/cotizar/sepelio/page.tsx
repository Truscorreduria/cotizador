"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Plus, Shield, Users, Star, Clock } from "lucide-react"

const cotizacionesSepelio = [
  { id: 1, cliente: "Roberto Martín", plan: "Plan Familiar", fecha: "2024-01-12", monto: "$800", estado: "Aprobada" },
  { id: 2, cliente: "Elena Vargas", plan: "Plan Individual", fecha: "2024-01-11", monto: "$500", estado: "Pendiente" },
  {
    id: 3,
    cliente: "José Hernández",
    plan: "Plan Premium",
    fecha: "2024-01-10",
    monto: "$1,200",
    estado: "En Revisión",
  },
]

const planesSepelio = [
  {
    nombre: "Plan Individual",
    precio: "Desde $500/año",
    beneficios: ["Servicio funerario completo", "Ataúd de calidad", "Trámites legales", "Velatorio 24 horas"],
    color: "blue",
  },
  {
    nombre: "Plan Familiar",
    precio: "Desde $800/año",
    beneficios: ["Cobertura para 4 personas", "Servicios premium", "Traslados incluidos", "Asistencia psicológica"],
    color: "green",
  },
  {
    nombre: "Plan Premium",
    precio: "Desde $1,200/año",
    beneficios: ["Cobertura ilimitada", "Servicios de lujo", "Capilla privada", "Catering incluido"],
    color: "purple",
  },
]

export default function CotizarSepelioPage() {
  const [formData, setFormData] = useState({
    cliente: "",
    telefono: "",
    email: "",
    edad: "",
    plan: "",
    beneficiarios: "",
    observaciones: "",
  })

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Aprobada":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "En Revisión":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Cotización de sepelio enviada:", formData)
    setFormData({
      cliente: "",
      telefono: "",
      email: "",
      edad: "",
      plan: "",
      beneficiarios: "",
      observaciones: "",
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seguros de Sepelio</h1>
            <p className="text-gray-600">Tranquilidad y dignidad en los momentos más difíciles</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Protege a tu familia con dignidad</h2>
              <p className="text-green-100 mb-6">
                Nuestros planes de sepelio ofrecen servicios funerarios completos con la calidad y respeto que tu
                familia merece, sin preocupaciones económicas adicionales.
              </p>
              <div className="flex space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Cotizar Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Nueva Cotización - Seguro de Sepelio</DialogTitle>
                      <DialogDescription>
                        Complete los datos para generar una cotización personalizada
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cliente">Nombre del Cliente *</Label>
                          <Input
                            id="cliente"
                            value={formData.cliente}
                            onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                            placeholder="Nombre completo"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input
                            id="telefono"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            placeholder="Número de contacto"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="correo@ejemplo.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edad">Edad del Asegurado *</Label>
                          <Input
                            id="edad"
                            type="number"
                            value={formData.edad}
                            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                            placeholder="35"
                            min="18"
                            max="85"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="plan">Tipo de Plan *</Label>
                          <Select
                            value={formData.plan}
                            onValueChange={(value) => setFormData({ ...formData, plan: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Plan Individual</SelectItem>
                              <SelectItem value="familiar">Plan Familiar</SelectItem>
                              <SelectItem value="premium">Plan Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="beneficiarios">Número de Beneficiarios</Label>
                        <Input
                          id="beneficiarios"
                          type="number"
                          value={formData.beneficiarios}
                          onChange={(e) => setFormData({ ...formData, beneficiarios: e.target.value })}
                          placeholder="1"
                          min="1"
                          max="10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="observaciones">Observaciones</Label>
                        <Textarea
                          id="observaciones"
                          value={formData.observaciones}
                          onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                          placeholder="Requerimientos especiales o información adicional..."
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline">
                          Cancelar
                        </Button>
                        <Button type="submit">Generar Cotización</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
                >
                  Ver Planes
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">¿Por qué elegir nuestro seguro?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Atención 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Sin períodos de carencia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Cobertura familiar</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Servicios premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planes Disponibles */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Nuestros Planes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planesSepelio.map((plan, index) => (
            <Card
              key={index}
              className={`border-2 ${
                plan.color === "blue"
                  ? "border-blue-200 hover:border-blue-400"
                  : plan.color === "green"
                    ? "border-green-200 hover:border-green-400"
                    : "border-purple-200 hover:border-purple-400"
              } transition-colors`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.nombre}</span>
                  <Badge
                    variant="outline"
                    className={
                      plan.color === "blue"
                        ? "text-blue-600 border-blue-600"
                        : plan.color === "green"
                          ? "text-green-600 border-green-600"
                          : "text-purple-600 border-purple-600"
                    }
                  >
                    {plan.precio}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          plan.color === "blue"
                            ? "bg-blue-500"
                            : plan.color === "green"
                              ? "bg-green-500"
                              : "bg-purple-500"
                        }`}
                      ></div>
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Seleccionar Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lista de Cotizaciones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Cotizaciones de Sepelio</CardTitle>
            <CardDescription>Historial de cotizaciones realizadas</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cotización
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Cotización - Seguro de Sepelio</DialogTitle>
                <DialogDescription>Complete los datos para generar una cotización personalizada</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente2">Nombre del Cliente *</Label>
                    <Input id="cliente2" placeholder="Nombre completo" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono2">Teléfono *</Label>
                    <Input id="telefono2" placeholder="Número de contacto" required />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit">Generar Cotización</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cotizacionesSepelio.map((cotizacion) => (
              <div
                key={cotizacion.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{cotizacion.cliente}</h4>
                  <p className="text-sm text-gray-600">{cotizacion.plan}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{cotizacion.monto}</p>
                    <p className="text-sm text-gray-500">{cotizacion.fecha}</p>
                  </div>
                  <Badge className={getStatusColor(cotizacion.estado)}>{cotizacion.estado}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
