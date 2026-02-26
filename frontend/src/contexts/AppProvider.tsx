import { CustomError } from "@/appconfig/CustomError"
import { SessionTimeout } from "@/components/common/SessionTimeout"
import { Toaster } from "@/components/ui/sonner"
import { AppContext } from "@/contexts/AppContext"
import { type InfoUsuaModel } from "@/models/InfoUsuaModel"
import { authService } from "@/services/AuthService"
import { useCallback, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"

interface Props {
   children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
   // estados
   const [usuarioSesion, setUsuarioSesion] = useState<InfoUsuaModel | null>(null)
   const estaAutenti = usuarioSesion !== null

   const logout = useCallback(() => {
      setUsuarioSesion(null)
      sessionStorage.accessToken = ""
      sessionStorage.refreshToken = ""
   }, [])

   const validarUsuarioSes = useCallback(async () => {
      const token = sessionStorage.accessToken
      const usuario = await authService.verificarToken(token)
      if (usuario === null) logout()
      setUsuarioSesion(usuario)
   }, [logout])

   const handleTimeout = useCallback(() => {
      logout()
      toast("Su sesión ha expirado por inactividad")
   }, [logout])

   const mostrarError = useCallback((error: CustomError | string) => {
      let message = ""
      if (typeof error === "string") message = error
      else message = error.errorModel?.message || error.message || "Error desconocido"
      toast(message)
   }, [])

   const mostrarMensaje = useCallback((mensaje: string) => {
      toast(mensaje)
   }, [])

   const context = useMemo(() => ({
      usuarioSesion,
      validarUsuarioSes,
      logout,
      mostrarError,
      mostrarMensaje
   }), [
      usuarioSesion,
      validarUsuarioSes,
      logout,
      mostrarError,
      mostrarMensaje])

   return (
      <AppContext.Provider value={context}>
         <Toaster />
         {
            estaAutenti &&
            <SessionTimeout
               onTimeout={handleTimeout}
               timeout="15m"
               avisarCuandoQuede="2m"
            />
         }
         {children}
      </AppContext.Provider>
   )
}
