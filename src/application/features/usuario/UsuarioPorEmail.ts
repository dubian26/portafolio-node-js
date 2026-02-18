import { CustomError } from "@/domain/errors/CustomError"
import { unitOfWork } from "@/infrastructure/config/UnitOfWork"

export interface UsuarioPorEmailRequest {
   email: string
}

export class UsuarioPorEmail {
   async execute(request: UsuarioPorEmailRequest) {
      const usuario = await unitOfWork.usuario.buscarPorEmail(request.email)
      if (!usuario) throw new CustomError("Usuario no encontrado.", 404)
      return usuario.toJSON()
   }
}
