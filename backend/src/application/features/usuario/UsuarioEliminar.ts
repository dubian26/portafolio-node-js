import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
}

export class UsuarioEliminar {
   async execute({ id }: Props) {
      const existe = await unitOfWork.usuario.buscarPorId(id)
      if (!existe) throw new CustomError("El usuario no existe.", 404)

      try {
         await unitOfWork.usuario.eliminar(id)
      } catch (error) {
         throw new CustomError("No se puede eliminar el usuario, es posible que tenga registros asociados.", 400)
      }

      return {
         id,
         mensaje: "Usuario eliminado con éxito."
      }
   }
}
