"use client"

import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Car, User, CreditCard, FileText } from "lucide-react"
import Swal from "sweetalert2"

interface StepperModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  vehicleData: any
  setVehicleData: (data: any) => void
  coverageData: any
  setCoverageData: (data: any) => void
  clientData: any
  setClientData: (data: any) => void
  detailedVehicleData: any
  setDetailedVehicleData: (data: any) => void
  paymentData: any
  setPaymentData: (data: any) => void
}

const steps = [
  { id: 1, title: "Datos del Vehículo", icon: Car },
  { id: 2, title: "Cobertura", icon: FileText },
  { id: 3, title: "Datos del Cliente", icon: User },
  { id: 4, title: "Detalles del Vehículo", icon: Car },
  { id: 5, title: "Forma de Pago", icon: CreditCard },
]

// Componente que “bloquea” el paso 4 hasta que el usuario confirme
function Step4Gate({
  onConfirm,
  onDecline,
}: {
  onConfirm: () => void
  onDecline: () => void
}) {
  useEffect(() => {
    console.log("[Step4Gate] Entró al gate del paso 4. Mostrando Swal…")
    ;(async () => {
      const res = await Swal.fire({
        title: "¿Deseas emitir la póliza?",
        text: "Si continúas, pasarás a ingresar los datos del vehículo.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, emitir póliza",
        cancelButtonText: "No, enviar a agente",
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      if (res.isConfirmed) {
        console.log("[Step4Gate] Confirmado: emitir póliza → desbloquear paso 4")
        onConfirm()
      } else {
        console.log("[Step4Gate] Rechazado: NO emitir → volver a paso 3 y notificar")
        await Swal.fire({
          title: "Información enviada",
          text: "Un agente de seguros se pondrá en contacto con la información suministrada.",
          icon: "success",
          confirmButtonText: "Entendido",
        })
        onDecline()
      }
    })()
  }, [onConfirm, onDecline])

  // Mientras decide, no mostramos el paso 4 todavía (placeholder)
  return (
    <div className="py-12 text-center text-sm text-gray-500">
      Confirmando tu elección…
    </div>
  )
}

export default function StepperModal({
  open,
  setOpen,
  currentStep,
  setCurrentStep,
  vehicleData,
  setVehicleData,
  coverageData,
  setCoverageData,
  clientData,
  setClientData,
  detailedVehicleData,
  setDetailedVehicleData,
  paymentData,
  setPaymentData,
}: StepperModalProps) {
  // Flag para “desbloquear” el contenido del paso 4 tras la confirmación
  const [step4Unlocked, setStep4Unlocked] = useState(false)

  // Log de cambios de paso
  useEffect(() => {
    console.log("[StepperModal] currentStep cambió a:", currentStep, "| step4Unlocked:", step4Unlocked)
  }, [currentStep, step4Unlocked])

  // Si salimos del paso 4, reseteamos el “desbloqueo” para la próxima vez
  useEffect(() => {
    if (currentStep !== 4 && step4Unlocked) {
      console.log("[StepperModal] Saliendo del paso 4 → reseteando step4Unlocked=false")
      setStep4Unlocked(false)
    }
  }, [currentStep, step4Unlocked])

  const nextStep = () => {
    if (currentStep < steps.length) {
      console.log("[StepperModal] Siguiente clic:", currentStep, "→", currentStep + 1)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      console.log("[StepperModal] Anterior clic:", currentStep, "→", currentStep - 1)
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Select
                  value={vehicleData.marca || ""}
                  onValueChange={(value) => setVehicleData({ ...vehicleData, marca: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="kia">Kia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  value={vehicleData.modelo || ""}
                  onChange={(e) => setVehicleData({ ...vehicleData, modelo: e.target.value })}
                  placeholder="Ej: Corolla"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="año">Año</Label>
              <Select
                value={vehicleData.año || ""}
                onValueChange={(value) => setVehicleData({ ...vehicleData, año: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona año" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label>Tipo de Cobertura</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                <Card
                  className={`cursor-pointer border-2 ${
                    coverageData.tipoCobertura === "amplia" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setCoverageData({ ...coverageData, tipoCobertura: "amplia" })}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Cobertura Amplia</h3>
                    <p className="text-sm text-gray-600">Protección completa contra todo riesgo</p>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer border-2 ${
                    coverageData.tipoCobertura === "exceso" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setCoverageData({ ...coverageData, tipoCobertura: "exceso" })}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Exceso de RC</h3>
                    <p className="text-sm text-gray-600">Cobertura de responsabilidad civil</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primerNombre">Primer Nombre</Label>
                <Input
                  id="primerNombre"
                  value={clientData.primerNombre || ""}
                  onChange={(e) => setClientData({ ...clientData, primerNombre: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="primerApellido">Primer Apellido</Label>
                <Input
                  id="primerApellido"
                  value={clientData.primerApellido || ""}
                  onChange={(e) => setClientData({ ...clientData, primerApellido: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={clientData.email || ""}
                onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={clientData.telefono || ""}
                  onChange={(e) => setClientData({ ...clientData, telefono: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="identificacion">Identificación</Label>
                <Input
                  id="identificacion"
                  value={clientData.identificacion || ""}
                  onChange={(e) => setClientData({ ...clientData, identificacion: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departamento">Departamento</Label>
                <Select
                  value={clientData.departamento || ""}
                  onValueChange={(value) => setClientData({ ...clientData, departamento: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="managua">Managua</SelectItem>
                    <SelectItem value="leon">León</SelectItem>
                    <SelectItem value="granada">Granada</SelectItem>
                    <SelectItem value="masaya">Masaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="municipio">Municipio</Label>
                <Input
                  id="municipio"
                  value={clientData.municipio || ""}
                  onChange={(e) => setClientData({ ...clientData, municipio: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={clientData.direccion || ""}
                onChange={(e) => setClientData({ ...clientData, direccion: e.target.value })}
              />
            </div>
          </div>
        )

      case 4: {
        // Gate: si aún no está “desbloqueado”, mostramos el SweetAlert y NO renderizamos el paso 4
        if (!step4Unlocked) {
          console.log("[Step 4] Gate ACTIVO (step4Unlocked=false). Renderizando Step4Gate…")
          return (
            <Step4Gate
              onConfirm={() => {
                console.log("[Step4Gate] onConfirm → step4Unlocked=true")
                setStep4Unlocked(true)
              }}
              onDecline={() => {
                console.log("[Step4Gate] onDecline → regresando a paso 3")
                // Aquí también podrías hacer el POST al backend para enviar el lead
                // fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, { ... })
                setCurrentStep(3)
              }}
            />
          )
        }

        console.log("[Step 4] Gate DESBLOQUEADO (step4Unlocked=true). Mostrando contenido del paso 4.")
        // Una vez confirmado, ya sí mostramos el contenido del paso 4
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="chasis">Número de Chasis</Label>
                <Input
                  id="chasis"
                  value={detailedVehicleData.chasis || ""}
                  onChange={(e) => setDetailedVehicleData({ ...detailedVehicleData, chasis: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="motor">Número de Motor</Label>
                <Input
                  id="motor"
                  value={detailedVehicleData.motor || ""}
                  onChange={(e) => setDetailedVehicleData({ ...detailedVehicleData, motor: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={detailedVehicleData.color || ""}
                  onChange={(e) => setDetailedVehicleData({ ...detailedVehicleData, color: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="placa">Placa</Label>
                <Input
                  id="placa"
                  value={detailedVehicleData.placa || ""}
                  onChange={(e) => setDetailedVehicleData({ ...detailedVehicleData, placa: e.target.value })}
                />
              </div>
            </div>
          </div>
        )
      }

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label>Forma de Pago</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                <Card
                  className={`cursor-pointer border-2 ${
                    paymentData.formaPago === "debito" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentData({ ...paymentData, formaPago: "debito" })}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Débito Automático</h3>
                    <p className="text-sm text-gray-600">Pago automático desde tu cuenta bancaria</p>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer border-2 ${
                    paymentData.formaPago === "deposito" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentData({ ...paymentData, formaPago: "deposito" })}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">Depósito Bancario</h3>
                    <p className="text-sm text-gray-600">Pago manual por depósito</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cotización de Seguro de Auto</DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-500"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-2 hidden md:block">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              Paso {currentStep} de {steps.length}
            </Badge>
          </div>
          <Button type="button" onClick={nextStep} disabled={currentStep === steps.length} className="flex items-center">
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
