import { dateUtility } from "@/appconfig/DateUtility"
import { CaracteristicaDialog } from "@/components/caracteristicas/CaracteristicaDialog"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { PageContainer } from "@/components/common/PageContainer"
import { Title } from "@/components/common/Title"
import { Button } from "@/components/ui/button"
import * as Card from "@/components/ui/card"
import { useAppContext } from "@/contexts/AppContext"
import { type CaracteristicaModel } from "@/models/CaracteristicaModel"
import { caracteristicaRepository } from "@/repositories/CaracteristicaRepository"
import { CalendarPlus, Edit, Plus, Sparkles, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Props {
   esMenuPublico: boolean
}

export const ContenidoPage = ({ esMenuPublico }: Props) => {
   const { mostrarError } = useAppContext()
   const [caracteristicas, setCaracteristicas] = useState<CaracteristicaModel[]>([])
   const [openDialog, setOpenDialog] = useState(false)
   const [openConfirm, setOpenConfirm] = useState(false)
   const [itemEdit, setItemEdit] = useState<CaracteristicaModel | null>(null)
   const [itemEliminar, setItemEliminar] = useState<CaracteristicaModel | null>(null)

   const cargarCaracteristicas = async () => {
      try {
         const data = await caracteristicaRepository.listarTodos()
         setCaracteristicas(data)
      } catch (error) {
         console.error(error)
         mostrarError("Error al cargar las características")
      }
   }

   useEffect(() => {
      let isMounted = true
      const fetchData = async () => {
         try {
            const data = await caracteristicaRepository.listarTodos()
            if (isMounted) setCaracteristicas(data)
         } catch (error) {
            console.error(error)
            if (isMounted) mostrarError("Error al cargar las características")
         }
      }
      fetchData()
      return () => { isMounted = false }
   }, [mostrarError])

   const handleNuevo = () => {
      setItemEdit(null)
      setOpenDialog(true)
   }

   const handleEditar = (item: CaracteristicaModel) => {
      setItemEdit(item)
      setOpenDialog(true)
   }

   const handleEliminar = (item: CaracteristicaModel) => {
      setItemEliminar(item)
      setOpenConfirm(true)
   }

   const confirmEliminar = async () => {
      try {
         if (!itemEliminar?.id) return
         await caracteristicaRepository.eliminar(itemEliminar.id)
         setOpenConfirm(false)
         cargarCaracteristicas()
      } catch (error) {
         console.error(error)
         mostrarError("Error al eliminar la característica")
      }
   }

   return (
      <PageContainer>
         <div className="flex justify-between items-center mb-4">
            <Title className="mb-0">{esMenuPublico ? "Acerca de" : "Contenido"}</Title>
            {
               !esMenuPublico &&
               <Button onClick={handleNuevo} className="gap-2 cursor-pointer">
                  <Plus className="size-4" />
                  Nuevo
               </Button>
            }
         </div>

         <p className="text-muted-foreground text-lg mb-6">
            Esta aplicación es una <strong className="text-foreground font-semibold">demostración</strong>{" "}
            de un sistema de inventario para tiendas virtuales.{" "}
            <a
               href="https://github.com/dubian26/demo-tienda-online-full"
               target="_blank" rel="noopener noreferrer"
               className="text-primary hover:text-primary/80 underline font-semibold transition-colors">
               Ir al repositorio GitHub.
            </a>{" "}
            A continuación se muestran las funcionalidades y
            tecnologías desarrolladas en esta aplicación:
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {
               caracteristicas
                  .sort((a, b) => {
                     const dateA = (a.fechaPublicacion as string) || ""
                     const dateB = (b.fechaPublicacion as string) || ""
                     return dateB.localeCompare(dateA)
                  })
                  .map((item) => (
                     <Card.Root key={item.id} className="group hover:border-primary/40 transition-all duration-300 hover:shadow-md flex flex-col">
                        <Card.Content className="p-5 flex flex-col flex-1">
                           <div className="flex items-start gap-4 mb-4">
                              <div className="shrink-0 bg-primary/10 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                 <Sparkles className="size-5 text-primary" />
                              </div>
                              <div className="text-foreground leading-relaxed flex-1 text-[0.95rem]">
                                 <span className="block font-semibold mb-1">{item.nombre}</span>
                                 {item.descripcion}
                              </div>
                           </div>
                           <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground border-t border-border/40">
                              <CalendarPlus className="size-4" />
                              <span>{item.fechaPublicacion ? dateUtility.formatFecha(item.fechaPublicacion) : "Sin fecha"}</span>
                              {
                                 !esMenuPublico &&
                                 <div className="ml-auto">
                                    <Button
                                       size="sm"
                                       variant="ghost"
                                       className="h-8 w-8 p-0 cursor-pointer"
                                       onClick={() => handleEditar(item)}
                                    >
                                       <Edit className="size-4" />
                                    </Button>
                                    <Button
                                       size="sm"
                                       variant="ghost"
                                       className="h-8 w-8 p-0 cursor-pointer"
                                       onClick={() => handleEliminar(item)}
                                    >
                                       <Trash2 className="size-4 text-destructive" />
                                    </Button>
                                 </div>
                              }
                           </div>
                        </Card.Content>
                     </Card.Root>
                  ))
            }
         </div>

         <CaracteristicaDialog
            isOpen={openDialog}
            onClose={setOpenDialog}
            itemEdit={itemEdit}
            onSave={cargarCaracteristicas}
         />

         <ConfirmDialog
            isOpen={openConfirm}
            onClose={setOpenConfirm}
            onConfirm={confirmEliminar}
            title="Eliminar característica"
            description={`¿Estás seguro que deseas eliminar "${itemEliminar?.nombre}"?`}
            confirmText="Eliminar"
            variant="destructive"
         />

      </PageContainer>
   )
}
