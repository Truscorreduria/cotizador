import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1" />
          <div className="text-sm text-gray-600">
            Bienvenido a tu portal de seguros
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
