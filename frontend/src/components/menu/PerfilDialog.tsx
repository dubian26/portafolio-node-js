import { ConfigForm } from "@/components/common/ConfigForm"
import { Title } from "@/components/common/Title"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditarUsuario } from "@/components/usuario/EditarUsuario"
import { useAppContext } from "@/contexts/AppContext"
import { LogOut, Settings, User as UserIcon } from "lucide-react"
import { useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
   children: ReactNode
}

export const PerfilDialog = ({ children }: Props) => {
   const navigate = useNavigate()
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

   const handleLogout = () => {
      logout()
      navigate("/")
   }

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
               <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                     <p className="text-sm font-medium leading-none">{userSession?.nombres} {userSession?.apellidos}</p>
                     <p className="text-xs leading-none text-muted-foreground">{userSession?.email}</p>
                  </div>
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={handleAbrirEditarUsu} className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
               </DropdownMenuItem>
               <DropdownMenuItem onClick={handleAbrirConfigDialog} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>

         <Dialog open={configDialogVisible} onOpenChange={setConfigDialogVisible}>
            <DialogContent className="sm:max-w-2xl">
               <DialogHeader>
                  <DialogTitle><Title>Parámetros del Sistema</Title></DialogTitle>
               </DialogHeader>
               <ConfigForm onSave={handleConfigActualizado} />
            </DialogContent>
         </Dialog>

         <Dialog open={editDialogVisible} onOpenChange={setEditDialogVisible}>
            <DialogContent className="sm:max-w-2xl">
               <DialogHeader>
                  <DialogTitle><Title>Editar Usuario</Title></DialogTitle>
               </DialogHeader>
               <EditarUsuario
                  id={userSession?.id ?? ""}
                  onUpdate={handleUsuActualizado}
               />
            </DialogContent>
         </Dialog>
      </>
   )
}
