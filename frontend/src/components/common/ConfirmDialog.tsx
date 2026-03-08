import { Button } from "@/components/ui/button"
import * as Dialog from "@/components/ui/dialog"
import { type ReactNode } from "react"

interface Props {
   isOpen: boolean
   onClose: (open: boolean) => void
   onConfirm: () => void
   title: string
   description: ReactNode
   confirmText?: string
   cancelText?: string
   variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export const ConfirmDialog = ({
   isOpen,
   onClose,
   onConfirm,
   title,
   description,
   confirmText = "Confirmar",
   cancelText = "Cancelar",
   variant = "destructive"
}: Props) => {
   return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
         <Dialog.Content>
            <Dialog.Header>
               <Dialog.Title>{title}</Dialog.Title>
               <Dialog.Description>{description}</Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer className="mt-4">
               <Button variant="outline" onClick={() => onClose(false)}>
                  {cancelText}
               </Button>
               <Button variant={variant} onClick={onConfirm}>
                  {confirmText}
               </Button>
            </Dialog.Footer>
         </Dialog.Content>
      </Dialog.Root>
   )
}
