/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
   "flex h-10 w-full rounded-md border border-input bg-background py-3 px-4 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
   {
      variants: {
         variant: {
            default: "",
            outline: "bg-background",
         },
         size: {
            default: "h-10",
            sm: "h-8",
            lg: "h-12",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   }
)

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
   VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, variant, size, ...props }, ref) => {
      return (
         <input
            ref={ref}
            className={cn(inputVariants({ variant, size, className }))}
            {...props}
         />
      )
   }
)
Input.displayName = "Input"

export { Input, inputVariants }
