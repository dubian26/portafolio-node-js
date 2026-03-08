import { SidebarContext } from "@/components/menu/SidebarContext"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { useContext } from "react"
import { NavLink } from "react-router-dom"

interface Props {
   icon: LucideIcon
   text: string
   alert: boolean
   to?: string
}

export const SidebarItem = ({ icon: Icon, text, alert, to = "/" }: Props) => {
   const { expanded } = useContext(SidebarContext)

   return (
      <NavLink
         to={to}
         className={({ isActive }) => cn(
            "relative flex items-center p-2 my-1 text-foreground",
            "font-medium rounded-md cursor-pointer transition-colors group",
            isActive ?
               "bg-linear-to-tr from-primary/40 to-primary/10 border-r-4 border-primary text-primary" :
               "hover:bg-primary/20"
         )}
      >
         <Icon size={20} />
         <span className={cn(
            "overflow-hidden transition-all",
            expanded ? "w-52 ml-3" : "w-0"
         )}>
            {text}
         </span>

         {alert && (
            <div className={cn(
               "absolute right-2 size-2 rounded bg-primary",
               expanded ? "" : "top-2"
            )} />
         )}

         {!expanded && (
            <div
               className={cn(
                  "absolute left-full rounded-md px-2 py-1 ml-6",
                  "bg-primary-100 text-primary-600 text-sm",
                  "invisible opacity-20 -translate-x-3 transition-all",
                  "group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
               )}
            >
               {text}
            </div>
         )}
      </NavLink>
   )
}
