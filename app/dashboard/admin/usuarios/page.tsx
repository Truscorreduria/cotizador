"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Plus, RefreshCw, Edit, Power } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/app/providers/AuthProvider";

// ✅ SweetAlert2
import Swal from "sweetalert2";

type Usuario = {
  id: number;
  email: string;
  primer_nombre: string;
  segundo_nombre?: string | null;
  primer_apellido: string;
  segundo_apellido?: string | null;
  telefono?: string | null;
  celular?: string | null;
  identificacion?: string | null;
  departamento?: string | null;
  municipio?: string | null;
  direccion?: string | null;
  rol: "administrador" | "colaborador";
  activo: boolean;
  fecha_registro?: string;
};

type ApiUsuariosResponse =
  | Usuario[]
  | {
      data?: Usuario[];
      pagination?: { total: number; limit: number; offset: number };
      items?: Usuario[];
    };

export default function UsuariosAdminPage() {
  const router = useRouter();
  const { user, isLoading, hasRole } = useAuth();

  const [items, setItems] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [debug, setDebug] = useState<any>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && user && !hasRole(["administrador"])) {
      router.replace("/dashboard");
    }
  }, [isLoading, user, hasRole, router]);

  const normalizeResponse = (data: ApiUsuariosResponse) => {
    if (data && !Array.isArray(data)) {
      const arr = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.items)
        ? data.items
        : [];
      const totalFromApi =
        typeof data.pagination?.total === "number"
          ? data.pagination.total
          : arr.length;
      return { arr, total: totalFromApi };
    }
    const arr = Array.isArray(data) ? data : [];
    return { arr, total: arr.length };
  };

  const fetchUsers = async (query?: string) => {
    setLoading(true);
    try {
      const params = query ? { search: query } : undefined;
      const data = await api.get<ApiUsuariosResponse>("/usuarios", params);
      setDebug(data);
      const norm = normalizeResponse(data);
      setItems(norm.arr);
      setTotal(norm.total);
    } catch (e) {
      console.error("Error cargando usuarios:", e);
      setItems([]);
      setTotal(0);
      Swal.fire({
        icon: "error",
        title: "No se pudieron cargar los usuarios",
        text: "Inténtalo nuevamente en unos segundos.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && hasRole(["administrador"])) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filtered = useMemo(() => {
    if (!q) return items;
    const s = q.toLowerCase();
    return items.filter((u) =>
      [
        u.email,
        u.primer_nombre,
        u.segundo_nombre || "",
        u.primer_apellido,
        u.segundo_apellido || "",
        u.identificacion || "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(s)
    );
  }, [items, q]);

  const list = q ? filtered : items;

  // ✅ Activar/Desactivar con SweetAlert2
  const toggleActivo = async (u: Usuario) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: `${u.activo ? "Desactivar" : "Activar"} usuario`,
        html: `¿Seguro que deseas <b>${u.activo ? "desactivar" : "activar"}</b> a <b>${u.primer_nombre} ${u.primer_apellido}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: u.activo ? "Sí, desactivar" : "Sí, activar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: u.activo ? "#dc2626" : "#16a34a",
      });

      if (!isConfirmed) return;

      await api.patch(`/usuarios/${u.id}/status`, { activo: !u.activo });

      await Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `El usuario ahora está ${!u.activo ? "activo" : "inactivo"}.`,
        timer: 1400,
        showConfirmButton: false,
      });

      fetchUsers(q);
    } catch (e) {
      console.error("Error cambiando estado:", e);
      await Swal.fire({
        icon: "error",
        title: "No se pudo cambiar el estado",
        text: "Revisa tu conexión o intenta más tarde.",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
            <p className="text-gray-600">Administración de usuarios del sistema</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => fetchUsers(q)} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Link href="/dashboard/admin/usuarios/nuevo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>
            Busca, edita y administra usuarios
            <span className="ml-2 text-xs text-gray-500">
              {typeof total === "number"
                ? `(Total: ${total}${q ? ` · Filtrados: ${list.length}` : ""})`
                : ""}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar por nombre, email o identificación…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchUsers(q)}
            />
            <Button variant="secondary" onClick={() => fetchUsers(q)} disabled={loading}>
              Buscar
            </Button>
          </div>

          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer">Debug respuesta /usuarios</summary>
            <pre className="bg-gray-50 p-3 rounded border overflow-x-auto max-h-60">
              {JSON.stringify(debug, null, 2)}
            </pre>
          </details>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      {[u.primer_nombre, u.segundo_nombre, u.primer_apellido, u.segundo_apellido]
                        .filter(Boolean)
                        .join(" ")}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge variant={u.rol === "administrador" ? "default" : "secondary"}>
                        {u.rol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          u.activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {u.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/dashboard/admin/usuarios/${u.id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant={u.activo ? "destructive" : "default"}
                        onClick={() => toggleActivo(u)}
                      >
                        <Power className="w-4 h-4 mr-1" />
                        {u.activo ? "Desactivar" : "Activar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {!loading && list.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      No hay usuarios para mostrar
                    </TableCell>
                  </TableRow>
                )}

                {loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                      Cargando…
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
