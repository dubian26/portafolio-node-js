import { ConfigForm } from "@/components/common/ConfigForm"
import { Title } from "@/components/common/Title"
import * as Dialog from "@/components/ui/dialog"
import * as DropdownMenu from "@/components/ui/dropdown-menu"
import { EditarUsuario } from "@/components/usuario/EditarUsuario"
import { useAppContext } from "@/contexts/AppContext"
import { LogOut, Settings, User as UserIcon } from "lucide-react"
import { Fragment, useState, type ReactNode } from "react"

interface Props {
   children: ReactNode
}

export const PerfilDialog = ({ children }: Props) => {
   const { userSession, logout } = useAppContext()
   const [editDialogVisible, setEditDialogVisible] = useState(false)
   const [configDialogVisible, setConfigDialogVisible] = useState(false)

   const handleAbrirEditarUsu = () => {
      setEditDialogVisible(true)
   }

   const handleCerrarEditarUsu = () => {
      setEditDialogVisible(false)
   }

   const handleUsuActualizado = () => {
      handleCerrarEditarUsu()
      logout()
   }

   const handleAbrirConfigDialog = () => {
      setConfigDialogVisible(true)
   }

   const handleCerrarConfigDialog = () => {
      setConfigDialogVisible(false)
   }

   const handleConfigActualizado = () => {
      handleCerrarConfigDialog()
      logout()
   }

   return (
      <Fragment>
         <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
               {children}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-56 p-4 text-lg" align="end" forceMount>
               <DropdownMenu.Label className="font-normal">
                  <div className="flex flex-col space-y-1">
                     <p className="text-lg font-medium leading-none">{userSession?.nombres} {userSession?.apellidos}</p>
                     <p className="text-md leading-none text-muted-foreground">{userSession?.email}</p>
                  </div>
               </DropdownMenu.Label>
               <DropdownMenu.Separator />
               <DropdownMenu.Item onClick={handleAbrirEditarUsu} className="cursor-pointer">
                  <UserIcon className="mr-2 size-5" strokeWidth={2.5} />
                  <span>Perfil</span>
               </DropdownMenu.Item>
               <DropdownMenu.Item onClick={handleAbrirConfigDialog} className="cursor-pointer">
                  <Settings className="mr-2 size-5" strokeWidth={2.5} />
                  <span>Configuración</span>
               </DropdownMenu.Item>
               <DropdownMenu.Separator />
               <DropdownMenu.Item onClick={() => logout()} className="cursor-pointer">
                  <LogOut className="mr-2 size-5" strokeWidth={2.5} />
                  <span>Cerrar Sesión</span>
               </DropdownMenu.Item>
            </DropdownMenu.Content>
         </DropdownMenu.Root>

         <Dialog.Root open={configDialogVisible} onOpenChange={setConfigDialogVisible}>
            <Dialog.Content className="sm:max-w-2xl">
               <Dialog.Header>
                  <Dialog.Title><Title>Parámetros del Sistema</Title></Dialog.Title>
               </Dialog.Header>
               <ConfigForm onSave={handleConfigActualizado} />
            </Dialog.Content>
         </Dialog.Root>

         <Dialog.Root open={editDialogVisible} onOpenChange={setEditDialogVisible}>
            <Dialog.Content className="sm:max-w-2xl">
               <Dialog.Header>
                  <Dialog.Title><Title>Editar Usuario</Title></Dialog.Title>
               </Dialog.Header>
               <EditarUsuario
                  id={userSession?.id ?? ""}
                  onUpdate={handleUsuActualizado}
               />
            </Dialog.Content>
         </Dialog.Root>
      </Fragment >
   )
}
