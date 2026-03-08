import { Sidebar } from "@/components/menu/Sidebar"
import { SidebarItem } from "@/components/menu/SidebarItem"
import { Topbar } from "@/components/menu/Topbar"
import { cn } from "@/lib/utils"
import { type MenuModel } from "@/models/MenuModel"
import * as Icon from "lucide-react"
import { useState } from "react"
import { Outlet } from "react-router-dom"

export const MenuLayout = () => {
   const [expanded, setExpanded] = useState(true)

   const menuItems: MenuModel[] = [
      { id: 1, icono: Icon.House, texto: "Contenido", alerta: true, ruta: "/contenido" },
      { id: 2, icono: Icon.BarChart3, texto: "Dashboard", alerta: false, ruta: "/dashboard" },
      { id: 3, icono: Icon.Users, texto: "Usuarios", alerta: false, ruta: "/usuarios" },
      { id: 4, icono: Icon.Warehouse, texto: "Inventario", alerta: false, ruta: "/inventario" },
      { id: 5, icono: Icon.Package, texto: "Ordenes", alerta: false, ruta: "/ordenes" },
      { id: 6, icono: Icon.Receipt, texto: "Facturas", alerta: false, ruta: "/facturas" },
      { id: 7, icono: Icon.Store, texto: "Tienda", alerta: false, ruta: "/tienda" }
   ]

   return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
         <div className="fixed inset-0 -z-1 bg-dots pointer-events-none" />
         <Topbar />
         <Sidebar expanded={expanded} onExpanded={setExpanded}>
            {
               menuItems.map(item => (
                  <SidebarItem
                     key={item.id}
                     icon={item.icono}
                     text={item.texto}
                     alert={item.alerta}
                     to={item.ruta}
                  />
               ))
            }
         </Sidebar>
         <main className={cn(
            "flex-1 overflow-x-hidden overflow-y-auto px-6 py-2",
            "mt-[58px] " + (expanded ? "ml-72" : "ml-16")
         )}>
            <Outlet />
         </main>
      </div>
   )
}
