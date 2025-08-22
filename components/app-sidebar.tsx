"use client"

import { Car, Heart, Shield, FileText, Users, AlertTriangle, Home, LogOut, ChevronDown } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Mis Seguros",
    url: "/dashboard/seguros",
    icon: Shield,
  },
  {
    title: "Recomendados",
    url: "/dashboard/recomendados",
    icon: Users,
  },
  {
    title: "Siniestros",
    url: "/dashboard/siniestros",
    icon: AlertTriangle,
  },
]

const cotizarItems = [
  {
    title: "Auto",
    url: "/dashboard/cotizar/auto",
    icon: Car,
  },
  {
    title: "Accidentes",
    url: "/dashboard/cotizar/accidentes",
    icon: Shield,
  },
  {
    title: "Sepelio",
    url: "/dashboard/cotizar/sepelio",
    icon: Heart,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

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
              {menuItems.map((item) => (
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
                      {cotizarItems.map((item) => (
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Juan Pérez</p>
            <p className="text-xs text-gray-500 truncate">juan@email.com</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 hover:text-gray-900">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
