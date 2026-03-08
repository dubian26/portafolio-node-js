
import { AppProvider } from "@/contexts/AppProvider"
import { CartProvider } from "@/contexts/CartProvider"
import { AppLayout } from "@/layout/AppLayout"
import { ContenidoPage } from "@/pages/ContenidoPage"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/LoginPage"
import { RegistrarsePage } from "@/pages/RegistrarsePage"
import { useMemo } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"

const RootEl = () => {
   return (
      <AppProvider>
         <CartProvider>
            <AppLayout />
         </CartProvider>
      </AppProvider>
   )
}

export const App = () => {
   const router = useMemo(() =>
      createBrowserRouter([
         {
            path: "/",
            element: <RootEl />,
            children: [
               {
                  index: true,
                  element: <HomePage />
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
                  path: "acerca-de",
                  element: <ContenidoPage esMenuPublico={true} />,
               },
               {
                  path: "contenido",
                  element: <ContenidoPage esMenuPublico={false} />,
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
      ]), [])

   return <RouterProvider router={router} />
}
