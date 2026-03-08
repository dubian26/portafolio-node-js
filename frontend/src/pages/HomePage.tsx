import { useAppContext } from "@/contexts/AppContext"
import { Navigate } from "react-router-dom"

export const HomePage = () => {
   const { userSession } = useAppContext()
   const estaAutenti = userSession !== null
   return estaAutenti ?
      <Navigate to="/contenido" replace={true} /> :
      <Navigate to="/login" replace={true} />
}