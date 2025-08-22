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
import { Shield, Plus, Heart, Star, Activity } from "lucide-react"

const cotizacionesAccidentes = [
  {
    id: 1,
    cliente: "Diego Herrera",
    cobertura: "Cobertura Total",
    fecha: "2024-01-10",
    monto: "$2,000",
    estado: "En Revisión",
  },
  {
    id: 2,
    cliente: "Sofía Castro",
    cobertura: "Cobertura Básica",
    fecha: "2024-01-09",
    monto: "$1,200",
    estado: "Aprobada",
  },
  {
    id: 3,
    cliente: "Miguel Torres",
    cobertura: "Cobertura Intermedia",
    fecha: "2024-01-08",
    monto: "$1,600",
    estado: "Pendiente",
  },
]

const tiposCobertura = [
  {
    nombre: "Cobertura Básica",
    precio: "Desde $1,200/año",
    suma: "$25,000",
    beneficios: ["Muerte accidental", "Incapacidad total", "Gastos médicos básicos", "Asistencia legal"],
    color: "blue",
  },
  {
    nombre: "Cobertura Intermedia",
    precio: "Desde $1,600/año",
    suma: "$50,000",
    beneficios: ["Todo lo anterior", "Incapacidad parcial", "Rehabilitación", "Gastos funerarios"],
    color: "green",
  },
  {
    nombre: "Cobertura Total",
    precio: "Desde $2,000/año",
    suma: "$100,000",
    beneficios: ["Cobertura completa", "Indemnización familiar", "Cuidados especiales", "Asistencia psicológica"],
    color: "purple",
  },
]

export default function CotizarAccidentesPage() {
  const [formData, setFormData] = useState({
    cliente: "",
    telefono: "",
    email: "",
    edad: "",
    ocupacion: "",
    cobertura: "",
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
    console.log("Cotización de accidentes enviada:", formData)
    setFormData({
      cliente: "",
      telefono: "",
      email: "",
      edad: "",
      ocupacion: "",
      cobertura: "",
      beneficiarios: "",
      observaciones: "",
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seguros de Accidentes</h1>
            <p className="text-gray-600">Protección integral contra accidentes personales</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Protección ante lo inesperado</h2>
              <p className="text-purple-100 mb-6">
                Nuestros seguros de accidentes te brindan la tranquilidad de estar protegido ante cualquier
                eventualidad, con coberturas amplias y beneficios inmediatos.
              </p>
              <div className="flex space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Cotizar Seguro
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Nueva Cotización - Seguro de Accidentes</DialogTitle>
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
                          <Label htmlFor="edad">Edad *</Label>
                          <Input
                            id="edad"
                            type="number"
                            value={formData.edad}
                            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                            placeholder="35"
                            min="18"
                            max="70"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ocupacion">Ocupación *</Label>
                          <Input
                            id="ocupacion"
                            value={formData.ocupacion}
                            onChange={(e) => setFormData({ ...formData, ocupacion: e.target.value })}
                            placeholder="Profesión del asegurado"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cobertura">Tipo de Cobertura *</Label>
                          <Select
                            value={formData.cobertura}
                            onValueChange={(value) => setFormData({ ...formData, cobertura: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione la cobertura" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basica">Cobertura Básica</SelectItem>
                              <SelectItem value="intermedia">Cobertura Intermedia</SelectItem>
                              <SelectItem value="total">Cobertura Total</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="beneficiarios">Beneficiarios</Label>
                          <Input
                            id="beneficiarios"
                            value={formData.beneficiarios}
                            onChange={(e) => setFormData({ ...formData, beneficiarios: e.target.value })}
                            placeholder="Nombres de beneficiarios"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="observaciones">Observaciones</Label>
                        <Textarea
                          id="observaciones"
                          value={formData.observaciones}
                          onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                          placeholder="Actividades de riesgo, condiciones médicas preexistentes, etc..."
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
                  className="text-white border-white hover:bg-white hover:text-purple-600 bg-transparent"
                >
                  Ver Coberturas
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Cobertura 24/7</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Accidentes laborales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Accidentes domésticos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Accidentes de tránsito</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Deportes y recreación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipos de Cobertura */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Tipos de Cobertura</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiposCobertura.map((cobertura, index) => (
            <Card
              key={index}
              className={`border-2 ${
                cobertura.color === "blue"
                  ? "border-blue-200 hover:border-blue-400"
                  : cobertura.color === "green"
                    ? "border-green-200 hover:border-green-400"
                    : "border-purple-200 hover:border-purple-400"
              } transition-colors`}
            >
              <CardHeader>
                <CardTitle className="text-lg">{cobertura.nombre}</CardTitle>
                <div className="flex justify-between items-center">
                  <Badge
                    variant="outline"
                    className={
                      cobertura.color === "blue"
                        ? "text-blue-600 border-blue-600"
                        : cobertura.color === "green"
                          ? "text-green-600 border-green-600"
                          : "text-purple-600 border-purple-600"
                    }
                  >
                    {cobertura.precio}
                  </Badge>
                  <span className="text-sm font-semibold text-gray-600">Suma: {cobertura.suma}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cobertura.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          cobertura.color === "blue"
                            ? "bg-blue-500"
                            : cobertura.color === "green"
                              ? "bg-green-500"
                              : "bg-purple-500"
                        }`}
                      ></div>
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Seleccionar Cobertura
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
            <CardTitle>Cotizaciones de Accidentes</CardTitle>
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
                <DialogTitle>Nueva Cotización - Seguro de Accidentes</DialogTitle>
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
            {cotizacionesAccidentes.map((cotizacion) => (
              <div
                key={cotizacion.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{cotizacion.cliente}</h4>
                  <p className="text-sm text-gray-600">{cotizacion.cobertura}</p>
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
