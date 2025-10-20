"use client";

import {
  Car,
  Heart,
  Shield,
  FileText,
  Users,
  AlertTriangle,
  Home,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "../app/providers/AuthProvider" // <-- ajusta si tu ruta es distinta

type Role = "administrador" | "colaborador";
type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roles?: Role[]; // si se omite => visible para todos
};

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Mis Seguros", url: "/dashboard/seguros", icon: Shield },
  { title: "Recomendados", url: "/dashboard/recomendados", icon: Users },
  { title: "Siniestros", url: "/dashboard/siniestros", icon: AlertTriangle },
  // { title: "Usuarios", url: "/dashboard/admin/usuarios", icon: Users, roles: ["administrador"] },
];

const cotizarItems: MenuItem[] = [
  { title: "Auto", url: "/dashboard/cotizar/auto", icon: Car },
  { title: "Accidentes", url: "/dashboard/cotizar/accidentes", icon: Shield },
  { title: "Sepelio", url: "/dashboard/cotizar/sepelio", icon: Heart },
];

function getInitials(name?: string, fallbackEmail?: string) {
  const src = (name || "").trim() || (fallbackEmail || "").trim();
  if (!src) return "US";
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user, hasRole, logout } = useAuth();

  // Nombre y correo a mostrar
  const u: any = user || {};
  const rawName = [u.primer_nombre, u.segundo_nombre, u.primer_apellido, u.segundo_apellido]
    .filter(Boolean)
    .join(" ");
  const displayName = rawName || (user?.email?.split("@")[0] ?? "Usuario");
  const displayEmail = user?.email ?? "";

  // Visibilidad de menús (si no hay hasRole, hacemos fallback a user.rol)
  const canSee = (roles?: Role[]) => !roles || (!!user?.rol && roles.includes(user.rol as Role));
  const visibleMain = menuItems.filter((m) => canSee(m.roles));
  const visibleCotizar = cotizarItems.filter((m) => canSee(m.roles));

  // ¿Es admin?
  const isAdmin =
    typeof hasRole === "function" ? hasRole("administrador") : user?.rol === "administrador";

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Trust</h2>
            <p className="text-sm text-blue-600">Correduría de Seguros</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Menú Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Submenú de Cotizar */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <FileText className="w-5 h-5" />
                      <span>Cotizar</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {visibleCotizar.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                            <Link href={item.url}>
                              <item.icon className="w-4 h-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Administración (solo admin) */}
              {isAdmin && (
                <>
                  <SidebarGroupLabel className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Administración
                  </SidebarGroupLabel>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith("/dashboard/admin/usuarios")}
                    >
                      <Link href="/dashboard/admin/usuarios" className="flex items-center space-x-3">
                        <Users className="w-5 h-5" />
                        <span>Usuarios</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {getInitials(displayName, displayEmail)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{displayEmail || "sesión no cargada"}</p>
            {user?.rol && (
              <p className="text-[10px] text-gray-500 mt-0.5 uppercase">Rol: {user.rol}</p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-600 hover:text-gray-900"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
