import { cn } from "@/utils/common"
import type { ReactNode } from "react"

interface Props {
   icon: ReactNode
   title: string
   description: string
}

export const FeatureCard = ({ icon, title, description }: Props) => {
   return (
      <div className={cn(
         "group bg-white/5 p-6 rounded-2xl border border-white/5",
         "hover:border-primary/30 transition-all duration-300"
      )}>
         <div className="flex gap-5 items-start">
            <div className={cn(
               "bg-primary/10 p-3 rounded-xl group-hover:scale-110",
               "transition-transform duration-300"
            )}>
               {icon}
            </div>
            <div>
               <h3 className="text-lg font-bold mb-1 text-white">{title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
         </div>
      </div>
   )
}
