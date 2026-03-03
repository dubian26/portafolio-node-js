import { unitOfWork } from "@/application/config/UnitOfWork"
import { Rol } from "@/domain/entities/Rol"
import { CustomError } from "@/domain/errors/CustomError"
import { v7 as uuidv7 } from "uuid"

export interface Props {
   nombre: string
   descripcion?: string
   activo?: boolean
}

export class RolCrear {
   async execute(request: Props) {
      const existe = await unitOfWork.rol.buscarPorNombre(request.nombre)
      if (existe) throw new CustomError("El rol ya existe en la base de datos.", 400)

      const nuevoRol = new Rol({
         id: uuidv7().replace(/-/g, ""),
         nombre: request.nombre,
         descripcion: request.descripcion || null,
         activo: request.activo !== undefined ? request.activo : true,
         fechaCreacion: new Date(),
         fechaModifica: new Date()
      })

      await unitOfWork.rol.insertar(nuevoRol)

      return {
         id: nuevoRol.id,
         mensaje: "Rol creado con éxito."
      }
   }
}
