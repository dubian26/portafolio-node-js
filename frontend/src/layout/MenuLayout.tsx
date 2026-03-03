import { BarChart3, House, Package, Receipt, Store, Users, Warehouse } from "lucide-react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/menu/Sidebar"
import { SidebarItem } from "../components/menu/SidebarItem"
import { Topbar } from "../components/menu/Topbar"
import { type MenuModel } from "../models/MenuModel"

export const MenuLayout = () => {
   const menuItems: MenuModel[] = [
      { id: 1, icono: House, texto: "Contenido", alerta: true, ruta: "/contenido" },
      { id: 2, icono: BarChart3, texto: "Dashboard", alerta: false, ruta: "/dashboard" },
      { id: 3, icono: Users, texto: "Usuarios", alerta: false, ruta: "/usuarios" },
      { id: 4, icono: Warehouse, texto: "Inventario", alerta: false, ruta: "/inventario" },
      { id: 5, icono: Package, texto: "Ordenes", alerta: false, ruta: "/ordenes" },
      { id: 6, icono: Receipt, texto: "Facturas", alerta: false, ruta: "/facturas" },
      { id: 7, icono: Store, texto: "Tienda", alerta: false, ruta: "/tienda" }
   ]

   return (
      <div className="flex h-screen">
         <Sidebar>
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
         <div className="flex-1 flex flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto px-6 py-2">
               <Outlet />
            </main>
         </div>
      </div>
   )
}
