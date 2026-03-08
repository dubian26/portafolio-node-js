import { useAppContext } from "@/contexts/AppContext"
import { LoginLayout } from "@/layout/LoginLayout"
import { MenuLayout } from "@/layout/MenuLayout"

export const AppLayout = () => {
   const { userSession } = useAppContext()
   const estaAutenti = userSession !== null
   return estaAutenti ? <MenuLayout /> : <LoginLayout />
}
