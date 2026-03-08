/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
   "flex min-h-[80px] w-full rounded-md border border-input bg-background py-3 px-4 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
   {
      variants: {
         variant: {
            default: "",
            outline: "bg-background",
         },
      },
      defaultVariants: {
         variant: "default",
      },
   }
)

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
   VariantProps<typeof textareaVariants>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
   ({ className, variant, ...props }, ref) => {
      return (
         <textarea
            ref={ref}
            className={cn(textareaVariants({ variant, className }))}
            {...props}
         />
      )
   }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
