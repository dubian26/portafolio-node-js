import { unitOfWork } from "@/application/config/UnitOfWork"
import { Caracteristica } from "@/domain/entities/Caracteristica"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
   nombre: string
   descripcion?: string
   activo?: boolean
   fechaPublicacion?: string
}

export class CaracteristicaActualizar {
   async execute(request: Props) {
      const existe = await unitOfWork.caracteristica.buscarPorId(request.id)
      if (!existe) throw new CustomError("La característica no existe.", 404)

      const caracteristicaActualizada = new Caracteristica({
         id: existe.id,
         nombre: request.nombre,
         descripcion: request.descripcion !== undefined ? (request.descripcion || null) : existe.descripcion,
         activo: request.activo !== undefined ? request.activo : existe.activo,
         fechaPublicacion: request.fechaPublicacion ? new Date(request.fechaPublicacion) : existe.fechaPublicacion,
         fechaCreacion: existe.fechaCreacion,
         fechaModifica: new Date()
      })

      await unitOfWork.caracteristica.actualizar(caracteristicaActualizada)

      return {
         id: caracteristicaActualizada.id,
         mensaje: "Característica actualizada con éxito."
      }
   }
}
