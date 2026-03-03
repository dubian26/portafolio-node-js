import { ConfigForm } from "@/components/common/ConfigForm"
import { Title } from "@/components/common/Title"
import { EditarUsuario } from "@/components/usuario/EditarUsuario"
import { useAppContext } from "@/contexts/AppContext"
import { Dialog } from "primereact/dialog"
import { Menu } from "primereact/menu"
import { OverlayPanel } from "primereact/overlaypanel"
import { useState, type RefObject } from "react"

interface Props {
   ref: RefObject<OverlayPanel | null>
}

export const PerfilDialog = ({ ref }: Props) => {
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
      <OverlayPanel ref={ref}>
         <div className="p-2">
            <div className="font-bold">{userSession?.nombres} {userSession?.apellidos}</div>
            <div>{userSession?.email}</div>
         </div>
         <Menu
            pt={{ root: { className: "border-0 bg-transparent" } }}
            model={[
               {
                  label: "Perfil", icon: "fa-solid fa-user",
                  command: () => handleAbrirEditarUsu()
               },
               {
                  label: "Configuración", icon: "fa-solid fa-gear",
                  command: () => handleAbrirConfigDialog()
               },
               {
                  label: "Cerrar Sesión", icon: "fa-solid fa-sign-out",
                  command: () => logout()
               }
            ]}
         />
         <Dialog
            header={<Title>Parametros del Sistema</Title>}
            visible={configDialogVisible}
            className="w-11/12 lg:w-3/4 xl:w-2/3"
            onHide={handleCerrarConfigDialog}
         >
            <ConfigForm onSave={handleConfigActualizado} />
         </Dialog>
         <Dialog
            header={<Title>Editar Usuario</Title>}
            visible={editDialogVisible}
            className="w-11/12 lg:w-3/4 xl:w-2/3"
            onHide={handleCerrarEditarUsu}
         >
            <EditarUsuario
               id={userSession?.id ?? ""}
               onUpdate={handleUsuActualizado}
            />
         </Dialog>
      </OverlayPanel>
   )
}
