import { PerfilDialog } from "@/components/menu/PerfilDialog"
import { SidebarContext } from "@/components/menu/SidebarContext"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Menu, Settings } from "lucide-react"
import { useMemo, type ReactNode } from "react"

interface Props {
   children: ReactNode
   expanded: boolean
   onExpanded: (expanded: boolean) => void
}

export const Sidebar = ({ children, expanded, onExpanded }: Props) => {
   const contextValue = useMemo(() => ({ expanded }), [expanded])

   return (
      <aside
         className={cn(
            "fixed top-[48px] left-0 bottom-0 z-50 glass-header",
            "shrink-0 overflow-hidden transition-all",
            expanded ? "w-72" : "w-16"
         )}
      >
         <nav className="h-full flex flex-col">
            <div className="p-3 flex justify-between items-center">
               <h1
                  onClick={() => onExpanded(!expanded)}
                  className={cn(
                     "text-primary font-extrabold cursor-pointer",
                     "overflow-hidden transition-all flex items-center",
                     expanded ? "w-full" : "w-0"
                  )}>
                  <span className="px-3 flex items-center">
                     <Menu size={20} />
                     <span className="ml-3">Menu</span>
                  </span>
               </h1>
               <button
                  onClick={() => onExpanded(!expanded)}
                  className={cn(
                     "size-10 min-w-10 rounded-full cursor-pointer flex items-center justify-center",
                     "text-primary hover:bg-primary/10 transition-colors"
                  )}>
                  {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
               </button>
            </div>

            <SidebarContext.Provider value={contextValue}>
               <ul className="flex-1 px-3">{children}</ul>
            </SidebarContext.Provider>

            <div className="border-t border-primary flex justify-end items-center p-3">
               <PerfilDialog>
                  <button
                     className={cn(
                        "size-10 min-w-10 rounded-full flex items-center justify-center",
                        "text-primary cursor-pointer hover:bg-primary/10 transition-colors"
                     )}>
                     <Settings size={20} />
                  </button>
               </PerfilDialog>
            </div>
         </nav>
      </aside>
   )
}
