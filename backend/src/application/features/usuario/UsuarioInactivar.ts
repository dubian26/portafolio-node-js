import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
}

export class UsuarioInactivar {
   async execute({ id }: Props) {
      const usuario = await unitOfWork.usuario.buscarPorId(id)
      if (!usuario) throw new CustomError("El usuario no existe.", 404)

      usuario.activo = false
      usuario.fechaModifica = new Date()

      await unitOfWork.usuario.actualizar(usuario)

      return {
         id,
         mensaje: "Usuario inactivado con éxito."
      }
   }
}
