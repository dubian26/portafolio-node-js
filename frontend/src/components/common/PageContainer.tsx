import * as Card from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import type { ReactNode } from "react"

interface Props {
   children: ReactNode
   className?: string
}

export const PageContainer = ({ children, className }: Props) => {
   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full"
      >
         <Card.Root className={cn(
            "bg-card text-card-foreground shadow-xs",
            "border border-border rounded-xl p-6 md:p-8",
            className
         )}>
            {children}
         </Card.Root>
      </motion.div>
   )
}
