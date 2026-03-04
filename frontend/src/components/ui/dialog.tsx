import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"
import { Dialog as DialogBase } from "radix-ui"
import * as React from "react"

const Dialog = ({
   ...props
}: React.ComponentProps<typeof DialogBase.Root>) => {
   return <DialogBase.Root data-slot="dialog" {...props} />
}

const DialogTrigger = ({
   ...props
}: React.ComponentProps<typeof DialogBase.Trigger>) => {
   return <DialogBase.Trigger data-slot="dialog-trigger" {...props} />
}

const DialogPortal = ({
   ...props
}: React.ComponentProps<typeof DialogBase.Portal>) => {
   return <DialogBase.Portal data-slot="dialog-portal" {...props} />
}

const DialogClose = ({
   ...props
}: React.ComponentProps<typeof DialogBase.Close>) => {
   return <DialogBase.Close data-slot="dialog-close" {...props} />
}

const DialogOverlay = ({
   className,
   ...props
}: React.ComponentProps<typeof DialogBase.Overlay>) => {
   return (
      <DialogBase.Overlay
         data-slot="dialog-overlay"
         className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-card/50",
            className
         )}
         {...props}
      />
   )
}

const DialogContent = ({
   className,
   children,
   showCloseButton = true,
   ...props
}: React.ComponentProps<typeof DialogBase.Content> & {
   showCloseButton?: boolean
}) => {
   return (
      <DialogPortal data-slot="dialog-portal">
         <DialogOverlay />
         <DialogBase.Content
            data-slot="dialog-content"
            className={cn(
               "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
               className
            )}
            {...props}
         >
            {children}
            {showCloseButton && (
               <DialogBase.Close
                  data-slot="dialog-close"
                  className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
               >
                  <XIcon />
                  <span className="sr-only">Close</span>
               </DialogBase.Close>
            )}
         </DialogBase.Content>
      </DialogPortal>
   )
}

const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
   return (
      <div
         data-slot="dialog-header"
         className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
         {...props}
      />
   )
}

const DialogFooter = ({
   className,
   showCloseButton = false,
   children,
   ...props
}: React.ComponentProps<"div"> & {
   showCloseButton?: boolean
}) => {
   return (
      <div
         data-slot="dialog-footer"
         className={cn(
            "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
            className
         )}
         {...props}
      >
         {children}
         {showCloseButton && (
            <DialogBase.Close asChild>
               <Button variant="outline">Close</Button>
            </DialogBase.Close>
         )}
      </div>
   )
}

const DialogTitle = ({
   className,
   ...props
}: React.ComponentProps<typeof DialogBase.Title>) => {
   return (
      <DialogBase.Title
         data-slot="dialog-title"
         className={cn("text-lg leading-none font-semibold", className)}
         {...props}
      />
   )
}

const DialogDescription = ({
   className,
   ...props
}: React.ComponentProps<typeof DialogBase.Description>) => {
   return (
      <DialogBase.Description
         data-slot="dialog-description"
         className={cn("text-muted-foreground text-sm", className)}
         {...props}
      />
   )
}

export {
   DialogClose as Close,
   DialogContent as Content,
   DialogDescription as Description,
   DialogFooter as Footer,
   DialogHeader as Header,
   DialogOverlay as Overlay,
   DialogPortal as Portal,
   Dialog as Root,
   DialogTitle as Title,
   DialogTrigger as Trigger
}
