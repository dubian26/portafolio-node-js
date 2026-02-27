
import { LoginLayout } from "@/layout/LoginLayout"
import { MenuLayout } from "@/layout/MenuLayout"
import { ContenidoPage } from "@/pages/ContenidoPage"
import { LoginPage } from "@/pages/LoginPage"
import { RegistrarsePage } from "@/pages/RegistrarsePage"
import { useMemo } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

export const App = () => {
   const estaAutenti = false
   const router = useMemo(() => createBrowserRouter([
      {
         path: "/",
         element: estaAutenti ? <MenuLayout /> : <LoginLayout />,
         children: [
            {
               index: true,
               element: estaAutenti ?
                  <Navigate to="/contenido" replace={true} /> :
                  <Navigate to="/login" replace={true} />
            },
            {
               path: "login",
               element: <LoginPage />,
            },
            {
               path: "registrarse",
               element: <RegistrarsePage />,
            },
            {
               path: "contenido",
               element: <ContenidoPage />,
            },
            {
               path: "*",
               element: <div className="p-4">Página en construcción...</div>
            }
         ]
      },
      {
         path: "*",
         element: <Navigate to="/" replace />,
      }
   ]), [estaAutenti])

   return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
         <div className="fixed inset-0 z-0 bg-dots pointer-events-none" />
         <RouterProvider router={router} />
      </div>
   )
}
