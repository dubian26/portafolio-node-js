import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface Props {
   children: ReactNode
   className?: string
}

export const Title = ({ children, className }: Props) => {
   return (
      <h1 className={cn(
         "text-2xl md:text-3xl font-extrabold mb-2",
         "bg-linear-to-r from-primary to-purple-500",
         "bg-clip-text text-transparent",
         className
      )}>
         {children}
      </h1>
   )
}