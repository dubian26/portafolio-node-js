import * as Card from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface Props {
   icon: ReactNode
   title: string
   description: string
}

export const FeatureCard = ({ icon, title, description }: Props) => {
   return (
      <Card.Root className="group hover:border-primary/30 transition-all duration-300">
         <Card.Content className="p-6">
            <div className="flex gap-5 items-start">
               <div className={cn(
                  "bg-primary/10 p-3 rounded-xl group-hover:scale-110",
                  "transition-transform duration-300"
               )}>
                  {icon}
               </div>
               <div>
                  <h3 className="text-lg font-bold mb-1 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
               </div>
            </div>
         </Card.Content>
      </Card.Root>
   )
}
