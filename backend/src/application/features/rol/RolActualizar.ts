import { unitOfWork } from "@/application/config/UnitOfWork"
import { Rol } from "@/domain/entities/Rol"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
   nombre: string
   descripcion?: string
   activo?: boolean
}

export class RolActualizar {
   async execute(request: Props) {
      const existe = await unitOfWork.rol.buscarPorId(request.id)
      if (!existe) throw new CustomError("El rol no existe.", 404)

      const rolActualizado = new Rol({
         id: existe.id,
         nombre: request.nombre,
         descripcion: request.descripcion !== undefined ? request.descripcion : existe.descripcion,
         activo: request.activo !== undefined ? request.activo : existe.activo,
         fechaCreacion: existe.fechaCreacion,
         fechaModifica: new Date()
      })

      await unitOfWork.rol.actualizar(rolActualizado)

      return {
         id: rolActualizado.id,
         mensaje: "Rol actualizado con éxito."
      }
   }
}
