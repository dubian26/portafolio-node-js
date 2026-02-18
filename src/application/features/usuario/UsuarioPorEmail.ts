import { unitOfWork } from "@/infrastructure/config/UnitOfWork"

export interface UsuarioPorEmailRequest {
   email: string
}

export class UsuarioPorEmail {
   async execute(request: UsuarioPorEmailRequest) {
      const usuario = await unitOfWork.usuario.buscarPorEmail(request.email)
      if (!usuario) throw new Error("Usuario no encontrado.")
      return usuario.toJSON()
   }
}
