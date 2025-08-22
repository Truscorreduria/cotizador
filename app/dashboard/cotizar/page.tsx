"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Car, Heart, Shield, Plus, Calendar, DollarSign, FileText } from 'lucide-react'

const cotizaciones = {
  automovil: [
    { id: 1, cliente: "María González", vehiculo: "Toyota Corolla 2020", fecha: "2024-01-15", monto: "$1,200", estado: "Pendiente" },
    { id: 2, cliente: "Carlos Ruiz", vehiculo: "Honda Civic 2019", fecha: "2024-01-14", monto: "$1,450", estado: "Aprobada" },
    { id: 3, cliente: "Ana López", vehiculo: "Nissan Sentra 2021", fecha: "2024-01-13", monto: "$1,100", estado: "En Revisión" },
  ],
  sepelio: [
    { id: 1, cliente: "Roberto Martín", plan: "Plan Familiar", fecha: "2024-01-12", monto: "$800", estado: "Aprobada" },
    { id: 2, cliente: "Elena Vargas", plan: "Plan Individual", fecha: "2024-01-11", monto: "$500", estado: "Pendiente" },
  ],
  accidentes: [
    { id: 1, cliente: "Diego Herrera", cobertura: "Cobertura Total", fecha: "2024-01-10", monto: "$2,000", estado: "En Revisión" },
    { id: 2, cliente: "Sofía Castro", cobertura: "Cobertura Básica", fecha: "2024-01-09", monto: "$1,200", estado: "Aprobada" },
  ]
}

export default function CotizarPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Aprobada": return "bg-green-100 text-green-800"
      case "Pendiente": return "bg-yellow-100 text-yellow-800"
      case "En Revisión": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const CotizacionForm = ({ tipo }: { tipo: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cliente">Nombre del Cliente</Label>
          <Input id="cliente" placeholder="Ingrese el nombre completo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input id="telefono" placeholder="Número de contacto" />
        </div>
      </div>

      {tipo === "automovil" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="marca">Marca del Vehículo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="nissan">Nissan</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" placeholder="Ej: Corolla, Civic" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="año">Año</Label>
              <Input id="año" type="number" placeholder="2020" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor">Valor del Vehículo</Label>
              <Input id="valor" placeholder="$15,000" />
            </div>
          </div>
        </>
      )}

      {tipo === "sepelio" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edad">Edad del Asegurado</Label>
              <Input id="edad" type="number" placeholder="35" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Tipo de Plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Plan Individual</SelectItem>
                  <SelectItem value="familiar">Plan Familiar</SelectItem>
                  <SelectItem value="grupal">Plan Grupal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      {tipo === "accidentes" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ocupacion">Ocupación</Label>
              <Input id="ocupacion" placeholder="Profesión del asegurado" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cobertura">Tipo de Cobertura</Label>
              <Select>
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
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="observaciones">Observaciones</Label>
        <Textarea id="observaciones" placeholder="Información adicional..." />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Generar Cotización</Button>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Cotizaciones</h1>
        <p className="text-gray-600">Gestiona todas tus cotizaciones de seguros</p>
      </div>

      {/* Automóvil */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Seguros de Automóvil</CardTitle>
              <CardDescription>Cotizaciones para vehículos</CardDescription>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedType("automovil")}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cotización
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Cotización - Automóvil</DialogTitle>
                <DialogDescription>
                  Complete los datos para generar una cotización de seguro de automóvil
                </DialogDescription>
              </DialogHeader>
              <CotizacionForm tipo="automovil" />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cotizaciones.automovil.map((cotizacion) => (
              <div key={cotizacion.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-medium">{cotizacion.cliente}</h4>
                  <p className="text-sm text-gray-600">{cotizacion.vehiculo}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{cotizacion.monto}</p>
                    <p className="text-sm text-gray-500">{cotizacion.fecha}</p>
                  </div>
                  <Badge className={getStatusColor(cotizacion.estado)}>
                    {cotizacion.estado}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sepelio */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle>Seguros de Sepelio</CardTitle>
              <CardDescription>Cotizaciones para servicios funerarios</CardDescription>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedType("sepelio")}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cotización
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Cotización - Sepelio</DialogTitle>
                <DialogDescription>
                  Complete los datos para generar una cotización de seguro de sepelio
                </DialogDescription>
              </DialogHeader>
              <CotizacionForm tipo="sepelio" />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cotizaciones.sepelio.map((cotizacion) => (
              <div key={cotizacion.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-medium">{cotizacion.cliente}</h4>
                  <p className="text-sm text-gray-600">{cotizacion.plan}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{cotizacion.monto}</p>
                    <p className="text-sm text-gray-500">{cotizacion.fecha}</p>
                  </div>
                  <Badge className={getStatusColor(cotizacion.estado)}>
                    {cotizacion.estado}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accidentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <CardTitle>Seguros de Accidentes</CardTitle>
              <CardDescription>Cotizaciones para accidentes personales</CardDescription>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedType("accidentes")}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cotización
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nueva Cotización - Accidentes</DialogTitle>
                <DialogDescription>
                  Complete los datos para generar una cotización de seguro de accidentes
                </DialogDescription>
              </DialogHeader>
              <CotizacionForm tipo="accidentes" />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cotizaciones.accidentes.map((cotizacion) => (
              <div key={cotizacion.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-medium">{cotizacion.cliente}</h4>
                  <p className="text-sm text-gray-600">{cotizacion.cobertura}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{cotizacion.monto}</p>
                    <p className="text-sm text-gray-500">{cotizacion.fecha}</p>
                  </div>
                  <Badge className={getStatusColor(cotizacion.estado)}>
                    {cotizacion.estado}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
