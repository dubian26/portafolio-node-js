import { unitOfWork } from "@/application/config/UnitOfWork"
import { Caracteristica } from "@/domain/entities/Caracteristica"
import { CustomError } from "@/domain/errors/CustomError"
import { v7 as uuidv7 } from "uuid"

export interface Props {
   nombre: string
   descripcion?: string
   activo?: boolean
   fechaPublicacion?: string
}

export class CaracteristicaCrear {
   async execute(request: Props) {
      const existe = await unitOfWork.caracteristica.buscarPorNombre(request.nombre)
      if (existe) throw new CustomError("La característica ya existe en la base de datos.", 400)

      const nuevaCaracteristica = new Caracteristica({
         id: uuidv7().replace(/-/g, ""),
         nombre: request.nombre,
         descripcion: request.descripcion || null,
         activo: request.activo !== undefined ? request.activo : true,
         fechaPublicacion: request.fechaPublicacion ? new Date(request.fechaPublicacion) : new Date(),
         fechaCreacion: new Date(),
         fechaModifica: new Date()
      })

      await unitOfWork.caracteristica.insertar(nuevaCaracteristica)

      return {
         id: nuevaCaracteristica.id,
         mensaje: "Característica creada con éxito."
      }
   }
}
