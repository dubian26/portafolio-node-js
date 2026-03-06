import { unitOfWork } from "@/application/config/UnitOfWork"
import { CustomError } from "@/domain/errors/CustomError"

export interface Props {
   id: string
   password?: string
   nombres: string
   apellidos: string
}

export class UsuarioActualizar {
   async execute(request: Props) {
      const usuario = await unitOfWork.usuario.buscarPorId(request.id)
      if (!usuario) throw new CustomError("El usuario no existe en la base de datos.", 501)

      usuario.nombres = request.nombres
      usuario.apellidos = request.apellidos
      usuario.fechaModifica = new Date()

      if (request.password)
         usuario.password = request.password

      await unitOfWork.usuario.actualizar(usuario)

      return {
         id: usuario.id,
         mensaje: "Usuario actualizado con éxito."
      }
   }
}
