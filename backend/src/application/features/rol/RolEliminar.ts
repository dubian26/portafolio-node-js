import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
}

export class RolEliminar {
   async execute({ id }: Props) {
      const existe = await unitOfWork.rol.buscarPorId(id)
      if (!existe) throw new CustomError("El rol no existe.", 404)

      try {
         await unitOfWork.rol.eliminar(id)
      } catch (error) {
         throw new CustomError("No se puede eliminar el rol, es posible que esté en uso.", 400)
      }

      return {
         id,
         mensaje: "Rol eliminado con éxito."
      }
   }
}
