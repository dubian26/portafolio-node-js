import { CustomError } from "@/appconfig/CustomError"
import { type ConfigModel } from "@/models/ConfigModel"
import { type InfoUsuaModel } from "@/models/InfoUsuaModel"
import { createContext, useContext } from "react"

interface Props {
   userSession: InfoUsuaModel | null
   config: ConfigModel
   login: (userInfo: InfoUsuaModel) => void
   logout: () => void
   mostrarError: (error: CustomError | string) => void
   mostrarMensaje: (mensaje: string) => void
   updateConfig: (config: ConfigModel) => Promise<void>
   resetConfig: () => Promise<void>
}

export const AppContext = createContext<Props | null>(null)

export const useAppContext = () => {
   const context = useContext(AppContext)
   if (!context) throw new Error("useAppContext no ha sido definido en AppProvider")
   return context
}
