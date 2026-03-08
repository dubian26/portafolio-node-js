import { CustomError } from "@/appconfig/CustomError"
import { FetchUtility } from "@/appconfig/FetchUtility"
import { SessionTimeout } from "@/components/common/SessionTimeout"
import { Toaster } from "@/components/ui/sonner"
import { AppContext } from "@/contexts/AppContext"
import type { ConfigModel } from "@/models/ConfigModel"
import { type InfoUsuaModel } from "@/models/InfoUsuaModel"
import { configRepository } from "@/repositories/ConfigRepository"
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const defaultConfig: ConfigModel = {
   id: 1,
   mockRequestDelay: "2s",
   expRefreshToken: "1d",
   expAccessToken: "15m",
   sessionTimeout: "30m",
   sessionWarning: "2m"
}

interface Props {
   children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
   const navigate = useNavigate()
   const [loading, setLoading] = useState(true)
   const [config, setConfig] = useState<ConfigModel>(defaultConfig)

   const [userSession, setUserSession] = useState<InfoUsuaModel | null>(() => {
      const savedSession = sessionStorage.userSession
      if (!savedSession) return null

      try {
         return JSON.parse(savedSession) as InfoUsuaModel
      } catch (error) {
         console.error("Error al parsear la sesión:", error)
         return null
      }
   })

   const cargarConfig = useCallback(async () => {
      try {
         setLoading(true)
         const storedConfig = await configRepository.obtener()
         if (storedConfig) setConfig(storedConfig)
      } catch (error) {
         console.error("Error loading configuration:", error)
      } finally {
         setLoading(false)
      }
   }, [])

   useEffect(() => { configRepository.asignarConfig(config) }, [config])
   useEffect(() => { cargarConfig() }, [cargarConfig])

   const login = useCallback((userInfo: InfoUsuaModel) => {
      sessionStorage.userSession = JSON.stringify(userInfo)
      setUserSession(userInfo)
   }, [])

   const logout = useCallback(() => {
      sessionStorage.userSession = ""
      setUserSession(null)
      navigate("/")
   }, [])

   // Registrar el handler de logout en FetchUtility
   // para que se ejecute cuando falle la renovación del token
   useEffect(() => {
      FetchUtility.setLogoutHandler(() => {
         logout()
         toast.error(
            "Su sesión ha expirado",
            { description: "El token no pudo ser renovado. Vuelva a iniciar sesión" }
         )
      })
   }, [logout])

   const updateConfig = useCallback(async (newConfig: ConfigModel) => {
      try {
         await configRepository.guardar(newConfig)
         setConfig(newConfig)
      } catch (error) {
         console.error("Error saving configuration:", error)
         throw error
      }
   }, [])

   const resetConfig = useCallback(async () => {
      await updateConfig(defaultConfig)
   }, [updateConfig])

   const handleTimeout = useCallback(() => {
      logout()
      toast.error(
         "Su sesión ha expirado por inactividad",
         { description: "Vuelva a iniciar sesión" }
      )
   }, [logout])

   const mostrarError = useCallback((error: CustomError | string) => {
      let message = ""
      if (typeof error === "string") message = error
      else message = error.errorModel?.message || error.message || "Error desconocido"
      toast.error("Ha ocurrido un error!", { description: message })
   }, [])

   const mostrarMensaje = useCallback((mensaje: string) => {
      toast.success("Operación exitosa!", { description: mensaje })
   }, [])

   const context = useMemo(() => ({
      userSession,
      config,
      login,
      logout,
      mostrarError,
      mostrarMensaje,
      updateConfig,
      resetConfig
   }), [
      userSession,
      config,
      login,
      logout,
      mostrarError,
      mostrarMensaje,
      updateConfig,
      resetConfig])

   return (
      <AppContext.Provider value={context}>
         <Toaster position="top-center" />
         {
            userSession !== null &&
            <SessionTimeout
               onTimeout={handleTimeout}
               timeout="15m"
               avisarCuandoQuede="2m"
            />
         }
         {loading ? <div>Cargando...</div> : children}
      </AppContext.Provider>
   )
}
