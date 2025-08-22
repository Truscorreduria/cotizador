"use client"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Plus, Shield, Users, Star, ChevronLeft, ChevronRight } from "lucide-react"

const cotizacionesAuto = [
  {
    id: 1,
    cliente: "María González",
    vehiculo: "Toyota Corolla 2020",
    fecha: "2024-01-15",
    monto: "$1,200",
    estado: "Pendiente",
  },
  {
    id: 2,
    cliente: "Carlos Ruiz",
    vehiculo: "Honda Civic 2019",
    fecha: "2024-01-14",
    monto: "$1,450",
    estado: "Aprobada",
  },
  {
    id: 3,
    cliente: "Ana López",
    vehiculo: "Nissan Sentra 2021",
    fecha: "2024-01-13",
    monto: "$1,100",
    estado: "En Revisión",
  },
]

const beneficiosAuto = [
  {
    icon: Shield,
    titulo: "Cobertura Total",
    descripcion: "Protección completa contra daños, robo y responsabilidad civil",
  },
  {
    icon: Users,
    titulo: "Asistencia 24/7",
    descripcion: "Grúa, mecánico y asistencia vial las 24 horas del día",
  },
  {
    icon: Star,
    titulo: "Sin Deducible",
    descripcion: "Planes disponibles sin deducible para mayor tranquilidad",
  },
]

const coberturas = [
  {
    nombre: "Responsabilidad Civil Del Conductor Por Muerte O Lesiones A Pasajeros",
    suma: "10,000.00",
    deducible: "",
    prima: ".00",
  },
  { nombre: "Gastos Médicos", suma: "10,000.00", deducible: "", prima: ".00" },
  {
    nombre: "Colisiones Mas Robo Total O Parcial A Consecuencia De Robo Total (1)",
    suma: "22,500.00",
    deducible: "20% Mínimo U$ 100.00",
    prima: "258.75",
  },
  { nombre: "Rotura De Vidrios", suma: "1,125.00", deducible: "", prima: ".00" },
  { nombre: "Desórdenes Públicos", suma: "22,500.00", deducible: "20% Mínimo U$ 100.00", prima: ".00" },
  { nombre: "Riesgos Catastróficos", suma: "22,500.00", deducible: "20% Mínimo U$ 100.00", prima: ".00" },
  { nombre: "Extensión Territorial", suma: "Incluida", deducible: "30% Mínimo U$ 100.00", prima: ".00" },
  {
    nombre: "R. Civil Obligatoria X Muerte O Lesiones Causadas A Una Persona",
    suma: "2,500.00",
    deducible: "",
    prima: "55.00",
  },
  {
    nombre: "R. Civil Obligatoria X Muerte O Lesiones Causadas A Dos O Mas Personas",
    suma: "5,000.00",
    deducible: "",
    prima: ".00",
  },
  {
    nombre: "R. Civil Obligatoria X Daños Materiales Causados A Terceras Personas",
    suma: "2,500.00",
    deducible: "",
    prima: ".00",
  },
]

export default function CotizarAutoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Paso 1: Información del vehículo
    marca: "",
    modelo: "",
    año: "",

    // Paso 2: Cobertura
    tipoCobertura: "amplia",
    excesoRC: "",

    // Paso 3: Datos del cliente
    primerNombre: "",
    segundoNombre: "",
    telefono: "",
    primerApellido: "",
    segundoApellido: "",
    celular: "",
    email: "",
    identificacion: "",
    departamento: "",
    municipio: "",
    direccion: "",
    parentesco: "",

    // Paso 4: Datos del vehículo detallados
    chasis: "",
    motor: "",
    color: "",
    placa: "",
    usoVehiculo: "",
    vigencia: "",
    circulacionDueño: "si",
    vehiculoDañado: "no",
    cesionDerechos: "no",

    // Paso 5: Forma de pago
    formaPago: "debito",
    aceptaTerminos: false,
    autorizaCorreo: false,
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

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Cotización enviada:", formData)
    setIsModalOpen(false)
    setCurrentStep(1)
    // Reset form data
    setFormData({
      marca: "",
      modelo: "",
      año: "",
      tipoCobertura: "amplia",
      excesoRC: "",
      primerNombre: "",
      segundoNombre: "",
      telefono: "",
      primerApellido: "",
      segundoApellido: "",
      celular: "",
      email: "",
      identificacion: "",
      departamento: "",
      municipio: "",
      direccion: "",
      parentesco: "",
      chasis: "",
      motor: "",
      color: "",
      placa: "",
      usoVehiculo: "",
      vigencia: "",
      circulacionDueño: "si",
      vehiculoDañado: "no",
      cesionDerechos: "no",
      formaPago: "debito",
      aceptaTerminos: false,
      autorizaCorreo: false,
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información del Vehículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marca">Marca *</Label>
                <Select value={formData.marca} onValueChange={(value) => setFormData({ ...formData, marca: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="kia">Kia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo *</Label>
                <Input
                  id="modelo"
                  value={formData.modelo}
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  placeholder="Ej: Corolla, Civic"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="año">Año *</Label>
                <Input
                  id="año"
                  type="number"
                  value={formData.año}
                  onChange={(e) => setFormData({ ...formData, año: e.target.value })}
                  placeholder="2020"
                  min="1990"
                  max="2024"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Detalle de Coberturas</h3>

            <div className="space-y-4">
              <RadioGroup
                value={formData.tipoCobertura}
                onValueChange={(value) => setFormData({ ...formData, tipoCobertura: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amplia" id="amplia" />
                  <Label htmlFor="amplia">Cobertura amplia daños propios + R.Civil y Otras</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exceso" id="exceso" />
                  <Label htmlFor="exceso">Cotizar exceso de responsabilidad civil obligatoria</Label>
                </div>
              </RadioGroup>

              {formData.tipoCobertura === "exceso" && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="excesoRC">Monto del exceso</Label>
                  <Select
                    value={formData.excesoRC}
                    onValueChange={(value) => setFormData({ ...formData, excesoRC: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Seleccione monto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">$0</SelectItem>
                      <SelectItem value="2500">$2,500</SelectItem>
                      <SelectItem value="5000">$5,000</SelectItem>
                      <SelectItem value="7500">$7,500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Detalle de Coberturas</th>
                    <th className="text-right p-3 font-medium">Suma Asegurada</th>
                    <th className="text-right p-3 font-medium">Deducible</th>
                    <th className="text-right p-3 font-medium">Prima</th>
                  </tr>
                </thead>
                <tbody>
                  {coberturas.map((cobertura, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{cobertura.nombre}</td>
                      <td className="p-3 text-right">{cobertura.suma}</td>
                      <td className="p-3 text-right">{cobertura.deducible}</td>
                      <td className="p-3 text-right">{cobertura.prima}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td className="p-3">Total a Pagar:</td>
                    <td className="p-3 text-right"></td>
                    <td className="p-3 text-right">U$</td>
                    <td className="p-3 text-right">358.52</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-blue-600 text-white p-3 rounded-t-lg">
              <h3 className="text-lg font-semibold">Datos del Cliente</h3>
            </div>
            <div className="space-y-4 p-4 border border-t-0 rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primerNombre">Primer Nombre *</Label>
                  <Input
                    id="primerNombre"
                    value={formData.primerNombre}
                    onChange={(e) => setFormData({ ...formData, primerNombre: e.target.value })}
                    placeholder="Primer nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                  <Input
                    id="segundoNombre"
                    value={formData.segundoNombre}
                    onChange={(e) => setFormData({ ...formData, segundoNombre: e.target.value })}
                    placeholder="Segundo nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="Teléfono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primerApellido">Primer Apellido *</Label>
                  <Input
                    id="primerApellido"
                    value={formData.primerApellido}
                    onChange={(e) => setFormData({ ...formData, primerApellido: e.target.value })}
                    placeholder="Primer apellido"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                  <Input
                    id="segundoApellido"
                    value={formData.segundoApellido}
                    onChange={(e) => setFormData({ ...formData, segundoApellido: e.target.value })}
                    placeholder="Segundo apellido"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="celular">Celular</Label>
                  <Input
                    id="celular"
                    value={formData.celular}
                    onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                    placeholder="Celular"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identificacion">Identificación *</Label>
                  <Input
                    id="identificacion"
                    value={formData.identificacion}
                    onChange={(e) => setFormData({ ...formData, identificacion: e.target.value })}
                    placeholder="Número de identificación"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento *</Label>
                  <Select
                    value={formData.departamento}
                    onValueChange={(value) => setFormData({ ...formData, departamento: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boaco">Boaco</SelectItem>
                      <SelectItem value="managua">Managua</SelectItem>
                      <SelectItem value="leon">León</SelectItem>
                      <SelectItem value="granada">Granada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="municipio">Municipio *</Label>
                  <Select
                    value={formData.municipio}
                    onValueChange={(value) => setFormData({ ...formData, municipio: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione municipio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teustepe">Teustepe</SelectItem>
                      <SelectItem value="managua">Managua</SelectItem>
                      <SelectItem value="leon">León</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección *</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    placeholder="Dirección completa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentesco">Parentesco</Label>
                  <Select
                    value={formData.parentesco}
                    onValueChange={(value) => setFormData({ ...formData, parentesco: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione parentesco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="titular">Titular</SelectItem>
                      <SelectItem value="conyuge">Cónyuge</SelectItem>
                      <SelectItem value="hijo">Hijo/a</SelectItem>
                      <SelectItem value="padre">Padre/Madre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-blue-600 text-white p-3 rounded-t-lg">
              <h3 className="text-lg font-semibold">Datos del Vehículo:</h3>
            </div>
            <div className="space-y-4 p-4 border border-t-0 rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marca2">Marca</Label>
                  <Input
                    id="marca2"
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    placeholder="Ingresa Marca"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chasis">Chasis</Label>
                  <Input
                    id="chasis"
                    value={formData.chasis}
                    onChange={(e) => setFormData({ ...formData, chasis: e.target.value })}
                    placeholder="Ingresa Chasis"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modelo2">Modelo</Label>
                  <Input
                    id="modelo2"
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    placeholder="Ingresa Modelo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motor">Motor</Label>
                  <Input
                    id="motor"
                    value={formData.motor}
                    onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
                    placeholder="Ingresa Motor"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="año2">Año</Label>
                  <Input
                    id="año2"
                    value={formData.año}
                    onChange={(e) => setFormData({ ...formData, año: e.target.value })}
                    placeholder="Ingresa Año"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blanco">Blanco</SelectItem>
                      <SelectItem value="negro">Negro</SelectItem>
                      <SelectItem value="gris">Gris</SelectItem>
                      <SelectItem value="azul">Azul</SelectItem>
                      <SelectItem value="rojo">Rojo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="placa">Placa</Label>
                  <Input
                    id="placa"
                    value={formData.placa}
                    onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                    placeholder="Ingresa Placa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usoVehiculo">Uso de Vehículo</Label>
                  <Select
                    value={formData.usoVehiculo}
                    onValueChange={(value) => setFormData({ ...formData, usoVehiculo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona uso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="particular">Particular</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="publico">Público</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Archivo Circulación</Label>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Seleccionar archivo Ningún archivo seleccionado
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vigencia">Vigencia:</Label>
                  <Input
                    id="vigencia"
                    value={formData.vigencia}
                    onChange={(e) => setFormData({ ...formData, vigencia: e.target.value })}
                    placeholder="Ingresa Vigencia"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>¿La circulación está a nombre del dueño actual?</Label>
                  <RadioGroup
                    value={formData.circulacionDueño}
                    onValueChange={(value) => setFormData({ ...formData, circulacionDueño: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="circulacion-si" />
                      <Label htmlFor="circulacion-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="circulacion-no" />
                      <Label htmlFor="circulacion-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>¿El vehículo presenta algún daño actualmente?</Label>
                  <RadioGroup
                    value={formData.vehiculoDañado}
                    onValueChange={(value) => setFormData({ ...formData, vehiculoDañado: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="daño-si" />
                      <Label htmlFor="daño-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="daño-no" />
                      <Label htmlFor="daño-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <h4 className="font-semibold">Cesionario:</h4>
              </div>

              <div className="space-y-2">
                <Label>¿Existe cesión de derechos de la póliza?</Label>
                <RadioGroup
                  value={formData.cesionDerechos}
                  onValueChange={(value) => setFormData({ ...formData, cesionDerechos: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="cesion-si" />
                    <Label htmlFor="cesion-si">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cesion-no" />
                    <Label htmlFor="cesion-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Únicamente se podrá asegurar vehículos de uso particular, no se puede asegurar taxis o de ningún tipo
                  de transporte colectivo.
                </p>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Forma de Pago</h3>

            <RadioGroup
              value={formData.formaPago}
              onValueChange={(value) => setFormData({ ...formData, formaPago: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debito" id="debito" />
                <Label htmlFor="debito">Débito Automático</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deposito" id="deposito" />
                <Label htmlFor="deposito">Depósito Referenciado</Label>
              </div>
            </RadioGroup>

            {formData.formaPago === "debito" && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Débito Automático</h4>
                <p className="text-blue-800 text-sm">
                  Nuestro ejecutivo se comunicará con usted para solicitar la información de su tarjeta de débito o
                  crédito para procesar el pago automático de su póliza.
                </p>
              </div>
            )}

            {formData.formaPago === "deposito" && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-center text-sm mb-4">
                    Enviar cheque a ASSA compañía de seguros a realizar pagos directo a caja.
                    <br />
                    Efectuar sus pagos, depositando en las cuentas bancarias de cualquier sucursal de los siguientes
                    bancos:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2 text-center">BANCO</th>
                          <th className="border border-gray-300 p-2 text-center">CUENTA DÓLARES</th>
                          <th className="border border-gray-300 p-2 text-center">CUENTA CÓRDOBAS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">Banco de Finanzas</td>
                          <td className="border border-gray-300 p-2 text-center">203-3018226</td>
                          <td className="border border-gray-300 p-2 text-center">202-3016497</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">Banco de América Central</td>
                          <td className="border border-gray-300 p-2 text-center">012-065900</td>
                          <td className="border border-gray-300 p-2 text-center">012-065892</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">Banco de la Producción</td>
                          <td className="border border-gray-300 p-2 text-center">1002-001031835</td>
                          <td className="border border-gray-300 p-2 text-center">1002-000971379</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">Ficohsa Nicaragua</td>
                          <td className="border border-gray-300 p-2 text-center">1560176-23-001</td>
                          <td className="border border-gray-300 p-2 text-center">1560176-21-002</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-center mt-4">
                    (Si el pago es realizado mediante una de las cuentas aquí detalladas, favor indicar al cajero que
                    detalle en el concepto el Número de Póliza)
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terminos"
                  checked={formData.aceptaTerminos}
                  onCheckedChange={(checked) => setFormData({ ...formData, aceptaTerminos: checked as boolean })}
                />
                <Label htmlFor="terminos" className="text-sm">
                  Doy fe de que toda la información introducida en este formulario es verdadera.
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="correo"
                  checked={formData.autorizaCorreo}
                  onCheckedChange={(checked) => setFormData({ ...formData, autorizaCorreo: checked as boolean })}
                />
                <Label htmlFor="correo" className="text-sm">
                  Autorizo a ASSA enviar por correo electrónico mi póliza, incluyendo renovación y/o adendas que se
                  realicen.
                </Label>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                Únicamente se podrá asegurar vehículos de uso particular, no se puede asegurar taxis o de ningún tipo de
                transporte colectivo
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Car className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seguros de Automóvil</h1>
            <p className="text-gray-600">Protege tu vehículo con la mejor cobertura del mercado</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">¿Por qué elegir nuestro seguro de auto?</h2>
              <p className="text-blue-100 mb-6">
                Ofrecemos la protección más completa para tu vehículo con coberturas flexibles, asistencia 24/7 y los
                mejores precios del mercado.
              </p>
              <div className="flex space-x-4">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Cotizar Ahora
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Cotización de Seguro de Automóvil - Paso {currentStep} de 5</DialogTitle>
                      <DialogDescription>
                        Complete todos los pasos para generar su cotización personalizada
                      </DialogDescription>
                    </DialogHeader>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                      ></div>
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">{renderStep()}</div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Anterior
                      </Button>

                      {currentStep < 5 ? (
                        <Button onClick={nextStep}>
                          Siguiente
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button onClick={handleSubmit} disabled={!formData.aceptaTerminos}>
                          Enviar Cotización
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Ver Beneficios
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Cotización Express</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Cobertura Básica:</span>
                    <span className="font-semibold">Desde $800/año</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cobertura Amplia:</span>
                    <span className="font-semibold">Desde $1,200/año</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cobertura Total:</span>
                    <span className="font-semibold">Desde $1,800/año</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beneficios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {beneficiosAuto.map((beneficio, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <beneficio.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{beneficio.titulo}</h3>
              <p className="text-gray-600 text-sm">{beneficio.descripcion}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de Cotizaciones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Cotizaciones Recientes</CardTitle>
            <CardDescription>Historial de cotizaciones de automóvil</CardDescription>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Cotizar Ahora
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cotizacionesAuto.map((cotizacion) => (
              <div
                key={cotizacion.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{cotizacion.cliente}</h4>
                  <p className="text-sm text-gray-600">{cotizacion.vehiculo}</p>
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
