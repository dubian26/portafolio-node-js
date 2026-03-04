import { cn } from "@/lib/utils"
import * as React from "react"

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
   return (
      <div
         className={cn(
            "bg-card text-card-foreground shadow-sm",
            "rounded-lg border border-border",
            className
         )}
         {...props}
      />
   )
}

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
   return <div className={cn("flex flex-col space-y-1.5", className)} {...props} />
}

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
   return (
      <h3
         className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
         )}
         {...props}
      />
   )
}

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
   return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
   return <div className={cn("p-6", className)} {...props} />
}

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
   return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export {
   CardContent as Content,
   CardDescription as Description,
   CardFooter as Footer,
   CardHeader as Header,
   Card as Root,
   CardTitle as Title
}
