import { Button } from "@/components/ui/button"
import * as Dialog from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAppContext } from "@/contexts/AppContext"
import { type CaracteristicaModel } from "@/models/CaracteristicaModel"
import { caracteristicaRepository } from "@/repositories/CaracteristicaRepository"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Props {
   isOpen: boolean
   onClose: (val: boolean) => void
   itemEdit: CaracteristicaModel | null
   onSave: () => void
}

export const CaracteristicaDialog = ({ isOpen, onClose, itemEdit, onSave }: Props) => {
   const { mostrarError } = useAppContext()
   const [loading, setLoading] = useState(false)
   const [nombre, setNombre] = useState("")
   const [descripcion, setDescripcion] = useState("")

   useEffect(() => {
      if (isOpen) {
         if (itemEdit) {
            setNombre(itemEdit.nombre)
            setDescripcion(itemEdit.descripcion)
         } else {
            setNombre("")
            setDescripcion("")
         }
      }
   }, [isOpen, itemEdit])

   const handleSave = async () => {
      if (!nombre.trim()) {
         mostrarError("El nombre es obligatorio")
         return
      }
      if (!descripcion.trim()) {
         mostrarError("La descripción es obligatoria")
         return
      }

      setLoading(true)
      try {
         if (itemEdit?.id) {
            await caracteristicaRepository.actualizar({
               id: itemEdit.id,
               nombre,
               descripcion
            })
         } else {
            await caracteristicaRepository.insertar({
               nombre,
               descripcion
            })
         }
         onSave()
         onClose(false)
      } catch (error) {
         console.error(error)
         mostrarError("Ocurrió un error al guardar la característica")
      } finally {
         setLoading(false)
      }
   }

   return (
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
         <Dialog.Content>
            <Dialog.Header>
               <Dialog.Title>
                  {itemEdit ? "Editar" : "Nueva"} Característica
               </Dialog.Title>
            </Dialog.Header>

            <div className="space-y-4 py-4">
               <div className="space-y-1">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                     placeholder="Ej: Responsive Design"
                  />
               </div>

               <div className="space-y-1">
                  <label className="text-sm font-medium">Descripción</label>
                  <Textarea
                     value={descripcion}
                     onChange={(e) => setDescripcion(e.target.value)}
                     placeholder="Detalle de la característica"
                     rows={4}
                  />
               </div>
            </div>

            <Dialog.Footer className="sm:justify-end gap-2">
               <Button variant="outline" onClick={() => onClose(false)} disabled={loading}>
                  Cancelar
               </Button>
               <Button onClick={handleSave} disabled={loading} className="min-w-[100px]">
                  {loading ? <Loader2 className="animate-spin size-4" /> : "Guardar"}
               </Button>
            </Dialog.Footer>
         </Dialog.Content>
      </Dialog.Root>
   )
}
