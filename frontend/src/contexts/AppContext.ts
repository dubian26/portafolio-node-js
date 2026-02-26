import { CustomError } from "@/appconfig/CustomError"
import { type ConfigModel } from "@/models/ConfigModel"
import { type InfoUsuaModel } from "@/models/InfoUsuaModel"
import { createContext, useContext } from "react"

export const defaultConfig: ConfigModel = {
   id: 1,
   mockRequestDelay: "2s",
   expRefreshToken: "1d",
   expAccessToken: "15m",
   sessionTimeout: "30m",
   sessionWarning: "2m"
}

interface Props {
   usuarioSesion: InfoUsuaModel | null
   validarUsuarioSes: () => Promise<void>
   logout: () => void
   mostrarError: (error: CustomError | string) => void
   mostrarMensaje: (mensaje: string) => void
}

export const AppContext = createContext<Props | null>(null)

export const useAppContext = () => {
   const context = useContext(AppContext)
   if (!context) throw new Error("useAppContext no ha sido definido en AppProvider")
   return context
}
