"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/api"
import Swal from "sweetalert2"

export type UserFormMode = "create" | "edit"

export type UserFormValues = {
  primer_nombre: string
  segundo_nombre?: string
  primer_apellido: string
  segundo_apellido?: string
  email: string
  password?: string // solo create o cambio explícito
  telefono?: string
  celular?: string
  identificacion?: string
  departamento?: string
  municipio?: string
  direccion?: string
  rol: "administrador" | "colaborador"
  activo: boolean
}

type Props = {
  mode: UserFormMode
  userId?: number
}

export default function UserForm({ mode, userId }: Props) {
  const router = useRouter()
  const isCreate = mode === "create"
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [values, setValues] = useState<UserFormValues>({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    password: "",
    telefono: "",
    celular: "",
    identificacion: "",
    departamento: "",
    municipio: "",
    direccion: "",
    rol: "colaborador",
    activo: true,
  })

  // Cargar datos en edición
  useEffect(() => {
    if (!isCreate && userId) {
      setLoading(true)
      api
        .get<any>(`/usuarios/${userId}`)
        .then((data) => {
          setValues({
            primer_nombre: data.primer_nombre || "",
            segundo_nombre: data.segundo_nombre || "",
            primer_apellido: data.primer_apellido || "",
            segundo_apellido: data.segundo_apellido || "",
            email: data.email || "",
            password: "",
            telefono: data.telefono || "",
            celular: data.celular || "",
            identificacion: data.identificacion || "",
            departamento: data.departamento || "",
            municipio: data.municipio || "",
            direccion: data.direccion || "",
            rol: data.rol,
            activo: !!data.activo,
          })
        })
        .catch((e) => {
          console.error("Error cargando usuario:", e)
          Swal.fire({
            icon: "error",
            title: "No se pudo cargar el usuario",
            text: "Intenta nuevamente.",
          }).then(() => {
            router.replace("/dashboard/admin/usuarios")
          })
        })
        .finally(() => setLoading(false))
    }
  }, [isCreate, userId, router])

  const handleChange =
    (k: keyof UserFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isCreate) {
        const payload = { ...values }
        if (!payload.password) {
          await Swal.fire({
            icon: "warning",
            title: "Contraseña requerida",
            text: "La contraseña es obligatoria para crear un usuario.",
          })
          setSaving(false)
          return
        }
        await api.post("/usuarios", payload)
        await Swal.fire({
          icon: "success",
          title: "Usuario creado",
          timer: 1400,
          showConfirmButton: false,
        })
      } else {
        const { password, ...rest } = values
        await api.patch(`/usuarios/${userId}`, rest)
        await Swal.fire({
          icon: "success",
          title: "Usuario actualizado",
          timer: 1400,
          showConfirmButton: false,
        })
      }
      router.push("/dashboard/admin/usuarios")
    } catch (e: any) {
      console.error("Error guardando usuario:", e)
      await Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        text: e?.data?.error || "Revisa los datos e inténtalo de nuevo.",
      })
    } finally {
      setSaving(false)
    }
  }

  // Cambio de contraseña en edición (con Swal: 2 inputs + validaciones)
  const handlePasswordChange = async () => {
    const { value: formValues, isConfirmed } = await Swal.fire({
      title: "Cambiar contraseña",
      html: `
        <div style="display:flex; flex-direction:column; gap:10px; text-align:left">
          <label>Nueva contraseña</label>
          <input id="swal-pass-1" type="password" class="swal2-input" placeholder="Mín. 8 caracteres" autocomplete="new-password" />
          <label>Confirmar contraseña</label>
          <input id="swal-pass-2" type="password" class="swal2-input" placeholder="Repite la contraseña" autocomplete="new-password" />
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const p1 = (document.getElementById("swal-pass-1") as HTMLInputElement)?.value
        const p2 = (document.getElementById("swal-pass-2") as HTMLInputElement)?.value
        if (!p1 || !p2) {
          Swal.showValidationMessage("Completa ambos campos.")
          return
        }
        if (p1.length < 8) {
          Swal.showValidationMessage("La contraseña debe tener al menos 8 caracteres.")
          return
        }
        if (p1 !== p2) {
          Swal.showValidationMessage("Las contraseñas no coinciden.")
          return
        }
        return { newPassword: p1 }
      },
    })

    if (!isConfirmed || !formValues) return

    try {
      await api.patch(`/usuarios/${userId}/password`, { newPassword: formValues.newPassword })
      await Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        timer: 1400,
        showConfirmButton: false,
      })
    } catch (e) {
      console.error("Error cambiando contraseña:", e)
      await Swal.fire({
        icon: "error",
        title: "No se pudo cambiar la contraseña",
        text: "Intenta nuevamente.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isCreate ? "Nuevo Usuario" : "Editar Usuario"}</CardTitle>
        <CardDescription>
          {isCreate ? "Completa los datos para crear un usuario." : "Modifica los datos necesarios y guarda los cambios."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-gray-500">Cargando…</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primer Nombre *</Label>
                <Input value={values.primer_nombre} onChange={handleChange("primer_nombre")} required />
              </div>
              <div className="space-y-2">
                <Label>Segundo Nombre</Label>
                <Input value={values.segundo_nombre} onChange={handleChange("segundo_nombre")} />
              </div>
              <div className="space-y-2">
                <Label>Primer Apellido *</Label>
                <Input value={values.primer_apellido} onChange={handleChange("primer_apellido")} required />
              </div>
              <div className="space-y-2">
                <Label>Segundo Apellido</Label>
                <Input value={values.segundo_apellido} onChange={handleChange("segundo_apellido")} />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" value={values.email} onChange={handleChange("email")} required />
              </div>

              {isCreate && (
                <div className="space-y-2">
                  <Label>Contraseña *</Label>
                  <Input type="password" value={values.password} onChange={handleChange("password")} required />
                </div>
              )}

              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={values.telefono} onChange={handleChange("telefono")} />
              </div>
              <div className="space-y-2">
                <Label>Celular</Label>
                <Input value={values.celular} onChange={handleChange("celular")} />
              </div>
              <div className="space-y-2">
                <Label>Identificación</Label>
                <Input value={values.identificacion} onChange={handleChange("identificacion")} />
              </div>
              <div className="space-y-2">
                <Label>Departamento</Label>
                <Input value={values.departamento} onChange={handleChange("departamento")} />
              </div>
              <div className="space-y-2">
                <Label>Municipio</Label>
                <Input value={values.municipio} onChange={handleChange("municipio")} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Dirección</Label>
                <Input value={values.direccion} onChange={handleChange("direccion")} />
              </div>

              <div className="space-y-2">
                <Label>Rol *</Label>
                <Select
                  value={values.rol}
                  onValueChange={(v: "administrador" | "colaborador") =>
                    setValues((s) => ({ ...s, rol: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="colaborador">Colaborador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 flex items-center gap-3">
                <Label className="mr-2">Activo</Label>
                <Switch checked={values.activo} onCheckedChange={(c) => setValues((s) => ({ ...s, activo: !!c }))} />
              </div>
            </div>

            {!isCreate && (
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={handlePasswordChange}>
                  Cambiar contraseña
                </Button>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => history.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Guardando…" : isCreate ? "Crear Usuario" : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
