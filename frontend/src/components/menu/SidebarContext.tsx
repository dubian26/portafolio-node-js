import { createContext } from "react"

interface Props {
   expanded: boolean
}

export const SidebarContext = createContext<Props>({
   expanded: true
})
