import { PerfilDialog } from "@/components/menu/PerfilDialog"
import { SidebarContext } from "@/components/menu/SidebarContext"
import { ChevronLeft, ChevronRight, Menu, Settings } from "lucide-react"
import { useMemo, useState, type ReactNode } from "react"

interface Props {
   children: ReactNode
}

export const Sidebar = ({ children }: Props) => {
   // estados
   const [expanded, setExpanded] = useState(true)
   const contextValue = useMemo(() => ({ expanded }), [expanded]);

   return (
      <aside
         className={`
            h-screen shrink-0 overflow-hidden transition-all 
            shadow-[2px_0_4px_rgba(0,0,0,0.1)] z-50
            bg-no-repeat bg-auto ${expanded ? "w-72" : "w-16"}
         `}
      >
         <nav className="h-full flex flex-col">
            <div className="p-3 flex justify-between items-center">
               <h1
                  onClick={() => setExpanded(curr => !curr)}
                  className={`
                     text-primary font-extrabold cursor-pointer 
                     overflow-hidden transition-all flex items-center
                     ${expanded ? "w-full" : "w-0"}`
                  }
               >
                  <span className="px-3 flex items-center">
                     <Menu size={20} />
                     <span className="ml-3">Menu</span>
                  </span>
               </h1>
               <button
                  onClick={() => setExpanded(curr => !curr)}
                  className={`
                     size-10 min-w-10 rounded-full cursor-pointer flex items-center justify-center
                     text-primary hover:bg-primary/10 transition-colors
                  `}
               >
                  {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
               </button>
            </div>

            <SidebarContext.Provider value={contextValue}>
               <ul className="flex-1 px-3">{children}</ul>
            </SidebarContext.Provider>

            <div className="border-t border-primary flex justify-end items-center p-3">
               <PerfilDialog>
                  <button
                     className="
                        size-10 min-w-10 rounded-full flex items-center justify-center
                        text-primary cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                     <Settings size={20} />
                  </button>
               </PerfilDialog>
            </div>
         </nav>
      </aside>
   )
}
